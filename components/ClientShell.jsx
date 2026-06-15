'use client';
import ApplyModal from './ApplyModal';

export default function ClientShell({ children }) {
  return (
    <>
      {children}
      <ApplyModal />
    </>
  );
}
