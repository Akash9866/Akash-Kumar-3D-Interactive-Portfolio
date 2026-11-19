import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  auth,
  db,
  googleSignIn,
  handleFirestoreError,
  initAuth,
  isPortfolioOwnerUser,
  logout,
  OperationType,
} from '../lib/firebase';
import { documentsRegistry, resolveDocumentUrl } from '../data/documents';

export type DocumentCategory =
  | 'resume'
  | 'internship'
  | 'project'
  | 'certification'
  | 'research'
  | 'education';

export interface PortfolioDocumentRecord {
  docKey: string;
  category: DocumentCategory;
  targetId: string;
  driveFileId: string;
  fileName: string;
  driveUrl: string;
  mimeType?: string;
  ownerUid: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export function makeDocumentKey(
  category: DocumentCategory,
  targetId: string
): string {
  const raw = category === 'resume' ? 'resume' : `${category}__${targetId}`;
  return raw.replace(/[^a-zA-Z0-9_\-]/g, '_').slice(0, 128);
}

interface DocumentsContextValue {
  user: User | null;
  accessToken: string | null;
  needsAuth: boolean;
  isSigningIn: boolean;
  isOwner: boolean;
  documentsByKey: Record<string, PortfolioDocumentRecord>;
  signIn: () => Promise<{ user: User; accessToken: string } | null>;
  signOutUser: () => Promise<void>;
  getDocumentRecord: (
    category: DocumentCategory,
    targetId: string
  ) => PortfolioDocumentRecord | null;
  getDocumentUrl: (
    category: DocumentCategory,
    targetId: string,
    itemFallbackUrl?: string | null
  ) => string | null;
  getDownloadUrl: (
    category: DocumentCategory,
    targetId: string,
    itemFallbackUrl?: string | null
  ) => string | null;
  saveDocumentBinding: (params: {
    category: DocumentCategory;
    targetId: string;
    driveFileId: string;
    fileName: string;
    driveUrl: string;
    mimeType?: string;
  }) => Promise<void>;
  removeDocumentBinding: (
    category: DocumentCategory,
    targetId: string
  ) => Promise<void>;
}

const DocumentsContext = createContext<DocumentsContextValue | null>(null);

export const DocumentsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [documentsByKey, setDocumentsByKey] = useState<
    Record<string, PortfolioDocumentRecord>
  >({});

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, token) => {
        setUser(authedUser);
        setAccessToken(token);
        setNeedsAuth(false);
      },
      (maybeUser) => {
        setUser(maybeUser);
        setAccessToken(null);
        setNeedsAuth(true);
      }
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    const path = 'portfolioDocuments';
    const unsubscribe = onSnapshot(
      collection(db, path),
      (snapshot) => {
        const next: Record<string, PortfolioDocumentRecord> = {};
        snapshot.forEach((snap) => {
          const data = snap.data() as PortfolioDocumentRecord;
          if (data?.docKey) {
            next[data.docKey] = data;
          }
        });
        setDocumentsByKey(next);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    setIsSigningIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        setNeedsAuth(false);
      }
      return result;
    } finally {
      setIsSigningIn(false);
    }
  };

  const signOutUser = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setNeedsAuth(true);
  };

  const getDocumentRecord = (
    category: DocumentCategory,
    targetId: string
  ): PortfolioDocumentRecord | null => {
    const key = makeDocumentKey(category, targetId);
    return documentsByKey[key] || null;
  };

  const getStaticFallback = (
    category: DocumentCategory,
    targetId: string,
    itemFallbackUrl?: string | null
  ): string | null => {
    if (category === 'resume') {
      return resolveDocumentUrl(documentsRegistry.resume.url || itemFallbackUrl);
    }
    const bucketMap: Record<
      Exclude<DocumentCategory, 'resume'>,
      Record<string, string | null>
    > = {
      internship: documentsRegistry.internships,
      project: documentsRegistry.projects,
      certification: documentsRegistry.certifications,
      research: documentsRegistry.research,
      education: documentsRegistry.education,
    };
    return resolveDocumentUrl(
      bucketMap[category][targetId] || itemFallbackUrl || null
    );
  };

  const getDocumentUrl = (
    category: DocumentCategory,
    targetId: string,
    itemFallbackUrl?: string | null
  ): string | null => {
    const live = getDocumentRecord(category, targetId);
    if (live?.driveUrl) {
      return live.driveUrl;
    }
    return getStaticFallback(category, targetId, itemFallbackUrl);
  };

  const getDownloadUrl = (
    category: DocumentCategory,
    targetId: string,
    itemFallbackUrl?: string | null
  ): string | null => {
    const live = getDocumentRecord(category, targetId);
    if (live?.driveFileId) {
      if (live.mimeType?.startsWith('application/vnd.google-apps.')) {
        return live.driveUrl;
      }
      return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(
        live.driveFileId
      )}`;
    }
    return getStaticFallback(category, targetId, itemFallbackUrl);
  };

  const saveDocumentBinding: DocumentsContextValue['saveDocumentBinding'] = async ({
    category,
    targetId,
    driveFileId,
    fileName,
    driveUrl,
    mimeType,
  }) => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Sign in with Google before saving document bindings.');
    }

    const docKey = makeDocumentKey(category, targetId);
    const sanitizedTargetId = targetId.slice(0, 128);
    const sanitizedFileId = driveFileId.slice(0, 200);
    const sanitizedFileName = fileName.slice(0, 255);
    const sanitizedDriveUrl = driveUrl.startsWith('https://')
      ? driveUrl.slice(0, 500)
      : `https://drive.google.com/file/d/${sanitizedFileId}/view`;
    const sanitizedMime = (mimeType || 'application/pdf').slice(0, 150);

    const docPath = `portfolioDocuments/${docKey}`;
    const ref = doc(db, 'portfolioDocuments', docKey);
    const existing = documentsByKey[docKey];

    try {
      if (existing) {
        await updateDoc(ref, {
          driveFileId: sanitizedFileId,
          fileName: sanitizedFileName,
          driveUrl: sanitizedDriveUrl,
          mimeType: sanitizedMime,
          updatedAt: serverTimestamp(),
        });
      } else {
        await setDoc(ref, {
          docKey,
          category,
          targetId: sanitizedTargetId,
          driveFileId: sanitizedFileId,
          fileName: sanitizedFileName,
          driveUrl: sanitizedDriveUrl,
          mimeType: sanitizedMime,
          ownerUid: currentUser.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    } catch (error) {
      handleFirestoreError(
        error,
        existing ? OperationType.UPDATE : OperationType.CREATE,
        docPath
      );
    }
  };

  const removeDocumentBinding = async (
    category: DocumentCategory,
    targetId: string
  ) => {
    const docKey = makeDocumentKey(category, targetId);
    const docPath = `portfolioDocuments/${docKey}`;
    try {
      await deleteDoc(doc(db, 'portfolioDocuments', docKey));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, docPath);
    }
  };

  return (
    <DocumentsContext.Provider
      value={{
        user,
        accessToken,
        needsAuth,
        isSigningIn,
        isOwner: isPortfolioOwnerUser(user),
        documentsByKey,
        signIn,
        signOutUser,
        getDocumentRecord,
        getDocumentUrl,
        getDownloadUrl,
        saveDocumentBinding,
        removeDocumentBinding,
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export function useDocuments(): DocumentsContextValue {
  const ctx = useContext(DocumentsContext);
  if (!ctx) {
    throw new Error('useDocuments must be used inside DocumentsProvider');
  }
  return ctx;
}
