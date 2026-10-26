'use client';
import { Download } from 'lucide-react';
export default function PrintButton() { return <button className="btn btn-blue no-print" onClick={()=>window.print()}><Download size={17}/> Imprimer ou enregistrer en PDF</button>; }
