import React, { useState } from 'react';
import { RoutePath } from '../router';
import {
  DocumentCategory,
  PortfolioDocumentRecord,
  DocumentsProvider,
  useDocuments,
} from '../context/DocumentsContext';
import {
  makeDriveFilePublicReader,
  openGooglePicker,
} from '../lib/googlePicker';
import { isPortfolioOwnerUser } from '../lib/firebase';
import { internshipsData } from '../data/internships';
import { projectsData } from '../data/projects';
import { certificationsData, educationData } from '../data/education';
import { researchData } from '../data/research';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import {
  FileText,
  FolderOpen,
  ExternalLink,
  Trash2,
  Globe,
  LogOut,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

interface DocumentsPageProps {
  onNavigate: (path: RoutePath) => void;
}

interface SlotItem {
  category: DocumentCategory;
  targetId: string;
  title: string;
  subtitle: string;
}

interface ConfirmationDialogState {
  type: 'share_public' | 'remove';
  slot: SlotItem;
  record: PortfolioDocumentRecord;
}

const DocumentsView: React.FC<DocumentsPageProps> = ({ onNavigate }) => {
  const {
    user,
    accessToken,
    needsAuth,
    isSigningIn,
    isOwner,
    signIn,
    signOutUser,
    getDocumentRecord,
    saveDocumentBinding,
    removeDocumentBinding,
  } = useDocuments();

  const [busySlotKey, setBusySlotKey] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [confirmDialog, setConfirmDialog] =
    useState<ConfirmationDialogState | null>(null);
  const [isConfirmExecuting, setIsConfirmExecuting] = useState(false);

  const sections: { heading: string; description: string; items: SlotItem[] }[] =
    [
      {
        heading: 'Resume / Curriculum Vitae',
        description:
          'Visitors clicking Resume in the sidebar or homepage immediately get the file linked here.',
        items: [
          {
            category: 'resume',
            targetId: 'resume',
            title: 'Akash Kumar — Latest Resume',
            subtitle: 'Primary CV PDF or Google Doc',
          },
        ],
      },
      {
        heading: 'Internship Certificates',
        description:
          'Completion certificates and letters displayed on your Internships page.',
        items: internshipsData.map((item) => ({
          category: 'internship',
          targetId: item.id,
          title: item.company,
          subtitle: `${item.role} · ${item.duration}`,
        })),
      },
      {
        heading: 'Project Reports & Presentations',
        description:
          'Reports, slide decks, and supporting PDFs shown inside each Project case study.',
        items: projectsData.map((proj) => ({
          category: 'project',
          targetId: proj.slug,
          title: proj.title,
          subtitle: proj.projectType || proj.category,
        })),
      },
      {
        heading: 'Certifications & Training',
        description:
          'Verified certificates linked on your Certifications page.',
        items: certificationsData.map((cert) => ({
          category: 'certification',
          targetId: cert.id,
          title: cert.title,
          subtitle: cert.issuer,
        })),
      },
      {
        heading: 'Research & Publications',
        description:
          'Research manuscripts and conference proceedings linked in Pensieve.',
        items: researchData.map((paper) => ({
          category: 'research',
          targetId: paper.slug,
          title: paper.title,
          subtitle: paper.publicationStatus,
        })),
      },
      {
        heading: 'Education Transcripts & Credentials',
        description:
          'Academic transcripts and degree documents linked in Education.',
        items: educationData.map((edu) => ({
          category: 'education',
          targetId: edu.id,
          title: edu.degree,
          subtitle: `${edu.institution} (${edu.duration})`,
        })),
      },
    ];

  const handleSignIn = async () => {
    setStatusMessage(null);
    try {
      await signIn();
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text:
          err instanceof Error
            ? err.message
            : 'Google Sign-In failed. Please try again.',
      });
    }
  };

  const handlePickFromDrive = async (slot: SlotItem) => {
    setStatusMessage(null);
    const slotKey = `${slot.category}:${slot.targetId}`;
    setBusySlotKey(slotKey);

    try {
      let token = accessToken;
      let activeUser = user;

      if (!token) {
        const authResult = await signIn();
        if (!authResult?.accessToken) {
          throw new Error('Google Drive authorization is required.');
        }
        token = authResult.accessToken;
        activeUser = authResult.user;
      }

      if (activeUser && !isPortfolioOwnerUser(activeUser) && activeUser.email) {
        setStatusMessage({
          type: 'error',
          text: `Signed in as ${activeUser.email}. Only the verified portfolio owner can publish document updates.`,
        });
        return;
      }

      const picked = await openGooglePicker(
        token,
        `Select ${slot.title} from Google Drive`
      );
      if (!picked) {
        return;
      }

      await saveDocumentBinding({
        category: slot.category,
        targetId: slot.targetId,
        driveFileId: picked.id,
        fileName: picked.name,
        driveUrl: picked.url,
        mimeType: picked.mimeType,
      });

      setStatusMessage({
        type: 'success',
        text: `Linked "${picked.name}" to ${slot.title}. Visitors will now open this Google Drive file.`,
      });
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text:
          err instanceof Error
            ? err.message
            : 'Could not select document from Google Picker.',
      });
    } finally {
      setBusySlotKey(null);
    }
  };

  const executeConfirmedAction = async () => {
    if (!confirmDialog) return;
    setIsConfirmExecuting(true);
    setStatusMessage(null);

    try {
      if (confirmDialog.type === 'share_public') {
        let token = accessToken;
        if (!token) {
          const authResult = await signIn();
          if (!authResult?.accessToken) {
            throw new Error('Google Drive authorization is required.');
          }
          token = authResult.accessToken;
        }
        await makeDriveFilePublicReader(
          token,
          confirmDialog.record.driveFileId
        );
        setStatusMessage({
          type: 'success',
          text: `"${confirmDialog.record.fileName}" is now readable by anyone with the link on Google Drive.`,
        });
      } else if (confirmDialog.type === 'remove') {
        await removeDocumentBinding(
          confirmDialog.slot.category,
          confirmDialog.slot.targetId
        );
        setStatusMessage({
          type: 'success',
          text: `Disconnected "${confirmDialog.record.fileName}" from ${confirmDialog.slot.title}.`,
        });
      }
      setConfirmDialog(null);
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text:
          err instanceof Error
            ? err.message
            : 'Failed to complete document action.',
      });
      setConfirmDialog(null);
    } finally {
      setIsConfirmExecuting(false);
    }
  };

  const formatTimestamp = (record: PortfolioDocumentRecord) => {
    try {
      if (record.updatedAt?.toDate) {
        return record.updatedAt.toDate().toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
      }
    } catch {
      return '';
    }
    return '';
  };

  return (
    <div className="mx-auto space-y-6 md:space-y-8">
      <button
        type="button"
        onClick={() => onNavigate('/')}
        className="hover:tracking-wide hover:underline transition-all inline-flex items-center gap-1.5 text-sm text-zinc-700 hover:text-zinc-900 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Portfolio</span>
      </button>

      {/* Header */}
      <div className="space-y-1.5">
        <h1 className="text-[26px] leading-[1.18] sm:text-4xl md:text-5xl font-medium tracking-tight text-zinc-900">
          Document Vault & Google Picker
        </h1>
        <p className="text-[14.5px] sm:text-base text-zinc-600 max-w-2xl leading-relaxed">
          Connect live Google Drive files for your Resume, internship certificates, and project reports. Updating a file version in Google Drive keeps every visitor link automatically up to date.
        </p>
      </div>

      {/* Google Workspace Auth Banner */}
      <div className="p-4 sm:p-6 rounded-xl bg-neutral-200/90 border border-zinc-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4 h-4 text-zinc-800 shrink-0" />
            <h2 className="text-[15px] sm:text-base font-semibold text-zinc-900">
              Google Drive Connection
            </h2>
          </div>
          {needsAuth || !user ? (
            <p className="text-[13px] sm:text-xs text-zinc-600 max-w-xl leading-relaxed">
              Sign in with Google to browse your Drive using Google Picker and attach live documents to your portfolio.
            </p>
          ) : (
            <div className="space-y-1">
              <p className="text-[13px] sm:text-xs text-zinc-700 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="break-all sm:break-normal">
                  Connected as <strong>{user.email}</strong>
                  {isOwner ? ' (Portfolio Owner)' : ' (Read-only Viewer)'}
                </span>
              </p>
              <p className="text-xs sm:text-[11px] text-zinc-600 leading-relaxed">
                Tip: In Google Drive, use <strong>Manage versions</strong> on a linked file to replace its PDF without changing any portfolio links.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {needsAuth || !user ? (
            <GoogleSignInButton
              onClick={handleSignIn}
              disabled={isSigningIn}
              label={isSigningIn ? 'Signing in…' : 'Sign in with Google'}
            />
          ) : (
            <button
              type="button"
              onClick={signOutUser}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[38px] sm:min-h-0 text-xs font-medium text-zinc-800 bg-white border border-zinc-300 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          )}
        </div>
      </div>

      {/* Feedback Notice */}
      {statusMessage && (
        <div
          className={`p-3.5 rounded-lg border text-[13px] sm:text-xs flex items-start gap-2.5 leading-relaxed ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Categorized Document Slots */}
      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.heading} className="space-y-3">
            <div className="space-y-0.5">
              <h2 className="text-lg font-semibold text-zinc-900">
                {section.heading}
              </h2>
              <p className="text-[13px] sm:text-xs text-zinc-600 leading-relaxed">
                {section.description}
              </p>
            </div>

            <div className="space-y-3">
              {section.items.map((slot) => {
                const record = getDocumentRecord(slot.category, slot.targetId);
                const slotKey = `${slot.category}:${slot.targetId}`;
                const isBusy = busySlotKey === slotKey;
                const updatedLabel = record ? formatTimestamp(record) : '';

                return (
                  <div
                    key={slotKey}
                    className="p-4 sm:p-5 rounded-xl bg-white/85 border border-zinc-300 flex flex-col md:flex-row md:items-center justify-between gap-3.5 sm:gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-zinc-700 shrink-0 mt-0.5" />
                        <h3 className="text-[15px] sm:text-sm font-semibold text-zinc-900 leading-snug">
                          {slot.title}
                        </h3>
                      </div>
                      <p className="text-[13px] sm:text-xs text-zinc-600 truncate">
                        {slot.subtitle}
                      </p>
                      {record ? (
                        <p className="text-xs text-emerald-800 font-medium pt-0.5 truncate">
                          Linked: {record.fileName}
                          {updatedLabel ? ` · Updated ${updatedLabel}` : ''}
                        </p>
                      ) : (
                        <p className="text-xs sm:text-[11px] text-zinc-500 pt-0.5">
                          No Google Drive document linked yet
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      {record && (
                        <>
                          <a
                            href={record.driveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 text-xs font-medium text-zinc-900 bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 rounded-md transition-colors"
                          >
                            <span>Preview</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          {isOwner && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  setConfirmDialog({
                                    type: 'share_public',
                                    slot,
                                    record,
                                  })
                                }
                                title="Set Google Drive sharing to Anyone with link"
                                className="inline-flex items-center gap-1 px-3 sm:px-2.5 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 text-xs font-medium text-zinc-800 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-md transition-colors cursor-pointer"
                              >
                                <Globe className="w-3.5 h-3.5" />
                                <span>Public Link</span>
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  setConfirmDialog({
                                    type: 'remove',
                                    slot,
                                    record,
                                  })
                                }
                                title="Disconnect document"
                                aria-label={`Disconnect ${slot.title}`}
                                className="inline-flex items-center justify-center min-h-[38px] min-w-[38px] sm:min-h-0 sm:min-w-0 p-2 sm:p-1.5 text-zinc-600 hover:text-red-700 bg-white hover:bg-red-50 border border-zinc-300 rounded-md transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </>
                      )}

                      <button
                        type="button"
                        onClick={() => handlePickFromDrive(slot)}
                        disabled={isBusy || isSigningIn}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 disabled:opacity-60 rounded-md transition-colors cursor-pointer"
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>
                          {isBusy
                            ? 'Opening Picker…'
                            : record
                            ? 'Replace File'
                            : 'Pick from Google Drive'}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Mandatory Confirmation Dialog for Drive Permission Mutation or Binding Deletion */}
      {confirmDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => !isConfirmExecuting && setConfirmDialog(null)}
        >
          <div
            className="w-full max-w-md bg-white border border-zinc-300 rounded-xl shadow-2xl p-5 sm:p-6 space-y-4 text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-zinc-900">
              {confirmDialog.type === 'share_public'
                ? 'Update Google Drive Sharing Permission?'
                : 'Disconnect Portfolio Document?'}
            </h3>
            <p className="text-sm sm:text-sm text-zinc-700 leading-relaxed">
              {confirmDialog.type === 'share_public'
                ? `This will grant read-only access ("Anyone with the link can view") on Google Drive for "${confirmDialog.record.fileName}" so portfolio visitors can open it.`
                : `This will remove the link to "${confirmDialog.record.fileName}" from "${confirmDialog.slot.title}" on your portfolio. Your original file in Google Drive will not be deleted.`}
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                disabled={isConfirmExecuting}
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 rounded-md transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isConfirmExecuting}
                onClick={executeConfirmedAction}
                className={`px-4 py-2 sm:py-1.5 min-h-[38px] sm:min-h-0 text-xs font-medium text-white rounded-md transition-colors cursor-pointer ${
                  confirmDialog.type === 'remove'
                    ? 'bg-red-700 hover:bg-red-800'
                    : 'bg-zinc-900 hover:bg-zinc-800'
                }`}
              >
                {isConfirmExecuting
                  ? 'Processing…'
                  : confirmDialog.type === 'share_public'
                  ? 'Confirm Sharing'
                  : 'Confirm Disconnect'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const DocumentsPage: React.FC<DocumentsPageProps> = (props) => (
  <DocumentsProvider>
    <DocumentsView {...props} />
  </DocumentsProvider>
);
