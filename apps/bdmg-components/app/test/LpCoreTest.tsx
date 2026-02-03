'use client';

import { useEffect, useState } from 'react';
import {
  TrustedForm,
  useTrustedForm,
  useUtmParams,
} from '@workspace/lp-core';

const EXTRA_UTM_MAPPINGS = [
  { urlParam: 'utm_campaign', cookieName: 'subid4' },
  { urlParam: 'utm_medium', cookieName: 'subid5' },
  { urlParam: 'utm_term', cookieName: 'subid6' },
];

const UTM_OPTIONS = {
  cookieDays: 30,
  extra: EXTRA_UTM_MAPPINGS,
};

export function LpCoreTest() {
  const { subid1, subid2, subid3, extra } = useUtmParams(UTM_OPTIONS);
  const { getCertificateData } = useTrustedForm(2000);
  const [trustedFormCertUrl, setTrustedFormCertUrl] = useState('');
  const [certData, setCertData] = useState<{ certUrl: string; token: string } | null>(null);
  const [testUtmUrl, setTestUtmUrl] = useState('');

  useEffect(() => {
    const baseUrl =
      `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    const params = new URLSearchParams({
      utm_source: 'test_source',
      utm_id: 'test_id',
      utm_s1: 'test_s1',
      utm_campaign: 'test_campaign',
      utm_medium: 'test_medium',
      utm_term: 'test_term',
    });
    setTestUtmUrl(`${baseUrl}?${params.toString()}`);
  }, []);

  const handleCertUrlReady = (certUrl: string) => {
    setTrustedFormCertUrl(certUrl);
  };

  const handleFetchCert = async () => {
    const data = await getCertificateData();
    setCertData(data);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full max-w-lg rounded-lg border border-gray-200 bg-gray-50 p-4 text-left font-mono text-sm">
      <form onSubmit={handleSubmit}>
        <TrustedForm onCertUrlReady={handleCertUrlReady} />

        <h2 className="mb-2 font-semibold text-gray-800">UTM params (from URL or cookies)</h2>
      <div className="mb-4 space-y-1">
        <p>
          <span className="text-gray-500">subid1 (utm_source):</span>{' '}
          {subid1 || '(empty)'}
        </p>
        <p>
          <span className="text-gray-500">subid2 (utm_id):</span>{' '}
          {subid2 || '(empty)'}
        </p>
        <p>
          <span className="text-gray-500">subid3 (utm_s1):</span>{' '}
          {subid3 || '(empty)'}
        </p>
        {extra && (
          <>
            <p className="mt-2 font-medium text-gray-700">Extra UTM (from options)</p>
            {EXTRA_UTM_MAPPINGS.map(({ urlParam, cookieName }) => (
              <p key={cookieName}>
                <span className="text-gray-500">{cookieName} ({urlParam}):</span>{' '}
                {extra[cookieName] || '(empty)'}
              </p>
            ))}
          </>
        )}
      </div>

      <h2 className="mb-2 font-semibold text-gray-800">TrustedForm cert URL</h2>
      <div className="mb-4 break-all">
        {trustedFormCertUrl ? (
          <p className="text-green-700">{trustedFormCertUrl}</p>
        ) : (
          <p className="text-gray-500">Waiting for TrustedForm script...</p>
        )}
      </div>

      <button
        type="button"
        onClick={handleFetchCert}
        className="mb-4 rounded bg-gray-800 px-3 py-1.5 text-white hover:bg-gray-700"
      >
        Get cert via useTrustedForm
      </button>
      {certData && (
        <div className="mb-4 space-y-1 break-all">
          <p>
            <span className="text-gray-500">certUrl:</span> {certData.certUrl || '(empty)'}
          </p>
          <p>
            <span className="text-gray-500">token:</span> {certData.token ? '***' : '(empty)'}
          </p>
        </div>
      )}

      <h2 className="mb-2 font-semibold text-gray-800">Test URL for UTM</h2>
      <p className="mb-1 text-gray-600">
        Open this URL to set UTM params in cookies and see them above (URL will be cleaned after
        load):
      </p>
      <a
        href={testUtmUrl}
        className="block break-all text-blue-600 underline hover:text-blue-800"
        target="_blank"
        rel="noreferrer"
      >
        {testUtmUrl || '(load page first)'}
      </a>
      </form>
    </div>
  )
}
