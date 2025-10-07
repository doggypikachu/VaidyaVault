
'use client';
import { useEffect, useRef } from 'react';
import Mirador from 'mirador';
export default function IIIFViewer({ manifestUrl }){
  const ref = useRef(null);
  useEffect(()=>{
    if(!ref.current) return;
    const id = 'mirador-' + Math.random().toString(36).slice(2);
    ref.current.id = id;
    Mirador.viewer({
      id,
      windows: [{ loadedManifest: manifestUrl, canvasIndex: 0, thumbnailNavigationPosition: 'far-bottom' }],
      workspace: { isWorkspaceAddVisible: false }
    });
  }, [manifestUrl]);
  return <div ref={ref} className="h-[70vh] rounded-xl overflow-hidden" />;
}
