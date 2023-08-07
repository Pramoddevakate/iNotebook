import React from 'react'

export default function Alerts(props) {
    const capitalize=(word)=>{
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
        
    }

  return (
 <div style={{height:'50px'}}>
   {props.alerts && <div className={`alert alert-${props.alerts.type}`} role="alert">
 <strong>{capitalize(props.alerts.type)}</strong> :{props.alerts.msg}
</div>}
</div>

  )
}
