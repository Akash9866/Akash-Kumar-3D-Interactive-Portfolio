export interface PickedDriveFile {
  id: string;
  name: string;
  url: string;
  mimeType: string;
}

declare global {
  interface Window {
    gapi?: {
      load: (
        api: string,
        options: {
          callback: () => void;
          onerror?: () => void;
        }
      ) => void;
    };
    google?: {
      picker?: {
        ViewId: {
          DOCS: unknown;
        };
        Action: {
          PICKED: string;
          CANCEL: string;
        };
        PickerBuilder: new () => {
          addView: (view: unknown) => any;
          setOAuthToken: (token: string) => any;
          setCallback: (cb: (data: any) => void) => any;
          setOrigin: (origin: string) => any;
          setTitle: (title: string) => any;
          build: () => { setVisible: (visible: boolean) => void };
        };
      };
    };
  }
}

let gapiScriptPromise: Promise<void> | null = null;
let pickerLoaded = false;

function loadGapiScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Picker requires a browser context.'));
  }

  if (window.gapi) {
    return Promise.resolve();
  }

  if (!gapiScriptPromise) {
    gapiScriptPromise = new Promise<void>((resolve, reject) => {
      const existing = document.querySelector<HTMLScriptElement>(
        'script[src="https://apis.google.com/js/api.js"]'
      );
      if (existing) {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener(
          'error',
          () => reject(new Error('Failed to load Google API script.')),
          { once: true }
        );
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () =>
        reject(new Error('Failed to load Google API script.'));
      document.head.appendChild(script);
    });
  }

  return gapiScriptPromise;
}

async function ensurePickerApi(): Promise<void> {
  await loadGapiScript();

  if (pickerLoaded && window.google?.picker) {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    if (!window.gapi) {
      reject(new Error('Google API loader unavailable.'));
      return;
    }
    window.gapi.load('picker', {
      callback: () => {
        pickerLoaded = true;
        resolve();
      },
      onerror: () => reject(new Error('Failed to load Google Picker API.')),
    });
  });
}

export async function openGooglePicker(
  accessToken: string,
  title?: string
): Promise<PickedDriveFile | null> {
  await ensurePickerApi();

  if (!window.google?.picker) {
    throw new Error('Google Picker widget did not initialize.');
  }

  const pickerApi = window.google.picker;
  const pickerOrigin =
    window.location.ancestorOrigins &&
    window.location.ancestorOrigins.length > 0
      ? window.location.ancestorOrigins[
          window.location.ancestorOrigins.length - 1
        ]
      : window.location.origin;

  return new Promise<PickedDriveFile | null>((resolve) => {
    let builder = new pickerApi.PickerBuilder()
      .addView(pickerApi.ViewId.DOCS)
      .setOAuthToken(accessToken)
      .setOrigin(pickerOrigin);

    if (title && typeof builder.setTitle === 'function') {
      builder = builder.setTitle(title);
    }

    const picker = builder
      .setCallback((data: any) => {
        if (data.action === pickerApi.Action.PICKED && data.docs?.[0]) {
          const doc = data.docs[0];
          const fileId = String(doc.id);
          const rawUrl =
            typeof doc.url === 'string' && doc.url.startsWith('https://')
              ? doc.url
              : `https://drive.google.com/file/d/${fileId}/view`;
          resolve({
            id: fileId,
            name: String(doc.name || 'Google Drive Document'),
            url: rawUrl,
            mimeType: String(doc.mimeType || 'application/pdf'),
          });
        } else if (data.action === pickerApi.Action.CANCEL) {
          resolve(null);
        }
      })
      .build();

    picker.setVisible(true);
  });
}

/**
 * Grants public read-only link sharing ("Anyone with the link -> Viewer") on a user-selected Drive file.
 * Must only be called after an explicit user confirmation dialog.
 */
export async function makeDriveFilePublicReader(
  accessToken: string,
  fileId: string
): Promise<void> {
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${encodeURIComponent(
      fileId
    )}/permissions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'reader',
        type: 'anyone',
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`Drive sharing update failed (${res.status}): ${text}`);
  }
}
