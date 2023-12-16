import { useState } from "react";
import './help.css';
import { IconBxsHelpCircle } from '../../icons';

export const Help = () => {
    const [help, setHelp] = useState("https://www.sorteonline.com.br/lotofacil?id=&utm_id=1160008389&utm_medium=cpc&utm_source=bing&utm_campaign=%5BS%5D+Lotof%C3%A1cil+-+Always+On+-+2023+-+M%C3%A1x.+Conv.&kpid=bi_cmp-603024105_adg-1278732692439105_ad-79920939749256_kwd-79921109807130:loc-20_dev-c_ext-_prd-_sig-ce5afc9169e012284edc99ecad99df02&msclkid=ce5afc9169e012284edc99ecad99df02");

    const handleHelp = () => {
        const novaAba = window.open(help, '_blank');
    }

    return (
        <>
            <button onClick={handleHelp} className="button-help">
                <IconBxsHelpCircle style={{ marginTop: "10px" }} />
                <p style={{ fontSize: "12px", marginTop: "-8px", color: "#333" }}>Ajuda</p>
            </button>
        </>
    );
}
