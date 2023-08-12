  
  const BODY_PARTS = [
    <line key="b" x1="20" y1="230" x2="100" y2="230" stroke="#000" strokeWidth="4px" strokeLinecap="round" />,
    <line key="post" x1="60" y1="20" x2="60" y2="230" />,
    <line key="top" x1="60" y1="20" x2="140" y2="20" />,
    <line key="noose" x1="140" y1="20" x2="140" y2="50" />,  
    <circle key="head" cx="140" cy="70" r="20" />,
    <line key="body" x1="140" y1="90" x2="140" y2="150" />,
    <line key="rightArm" x1="140" y1="120" x2="120" y2="100" />,
    <line key="leftArm" x1="140" y1="120" x2="160" y2="100" />,
    <line key="rightLeg" x1="140" y1="150" x2="120" y2="180" />,
    <line key="leftLeg" x1="140" y1="150" x2="160" y2="180" />
  ]
  
  type HangmanDrawingProps = {
    numberOfGuesses: number
  }
  
  export default function HangmanDrawingSVG({ numberOfGuesses }: HangmanDrawingProps) {
    return (
        <>
            {numberOfGuesses === 0 ?
            <div style={{fontSize:"1.5rem",display:"flex",alignItems:"center",width:"100%",height:"100%",textAlign:"center"}}>Press a letter to get started.</div>
            :
            <svg height="100%" width="100%" viewBox="0 0 200 250" fill="transparent" stroke="#000" strokeWidth="4px" strokeLinecap="round">
                {BODY_PARTS.slice(0, numberOfGuesses)}
            </svg>
            }
        </>
    )
  }