'use client';
import { useLanguage } from '../language-provider';
import { Download } from 'lucide-react';
export default function PrintButton() { const { t } = useLanguage(); return <button className="btn btn-blue no-print" onClick={()=>window.print()}><Download size={17}/>{t(" Imprimer ou enregistrer en PDF")}</button>; }
