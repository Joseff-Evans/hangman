import { useCallback, useEffect, useState } from "react"
import HangmanDrawingSVG from "./util/hangmanSVG.tsx"
import champs from "./util/champs.json"
import "./styles.css"

function App() {

  const getWord = () : string => {
    let word = champs[Math.floor(Math.random() * champs.length)]; 
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  };

  const [word, setWord] = useState<string>( getWord );
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(0);

  const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
  const maxGuesses = 10;

  const currentGuesses = guessedLetters.filter((letter) => !word.toUpperCase().includes(letter)).length;
  const isGuessed = word.length === word.toUpperCase().split('').filter((letter) => guessedLetters.includes(letter)).length;

  const resetHangman = () => {
    setGuessedLetters([]);
    setWord(getWord);
  }

  const addGuessLetter = useCallback((letter : string) => { 
    if(guessedLetters.includes(letter)) return
    setGuessedLetters((prev) => [...prev,letter]);
  },
  [guessedLetters]
  );

  useEffect(() => {
    setGuessedLetters(word.split('').filter((letter) => !allLetters.includes(letter.toUpperCase())));
  },[word])

  useEffect(() => {
    if ( isGuessed ) { 
      setStreak((prev) => prev + 1);
    } else if ( currentGuesses >= maxGuesses ) {
      setStreak(0);
    }
  },[guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      
      const key = e.key.toUpperCase();

      if (key.match(/^(ENTER)$/) && (isGuessed || currentGuesses >= maxGuesses)) {
        resetHangman();
      }

      if (!key.match(/^[a-zA-Z]$/) || (isGuessed || currentGuesses >= maxGuesses)) return

      addGuessLetter(key);
      
    };

    document.addEventListener("keypress",handler);

    return () => {
      document.removeEventListener("keypress",handler);
    }

  },[guessedLetters]);

  return (
    <div className="outerContainer">
    <div className="container">
    <div className="resetBanner">
    <h2
    onClick={() => 
      currentGuesses >= maxGuesses || isGuessed ? resetHangman() : ""
    }>{currentGuesses >= maxGuesses ? <><span style={{color:"red"}}>You Lose.</span> Click here to or press enter to reset</> : 
    isGuessed ? 
    <><span style={{color:"green"}}>You Win.</span> Click here to or press enter to reset</> : 
    "\u00A0"
    }</h2>
    </div>
    
    <div className="hangmanBox">
      <HangmanDrawingSVG numberOfGuesses={currentGuesses}/>
    </div>

    <div className="wordContainer">{
      word.split(' ').map((word, index) => 
      <div className="word" key={index}>
      {word.split('').map((letter, index) => 
      <div className={allLetters.includes(letter.toUpperCase()) ? "azLetters" : "otherLetters"} key={index}>
        {guessedLetters.includes(letter.toUpperCase()) ? isGuessed ? <span style={{color:"green"}}>{letter}</span> : <span>{letter}</span> : currentGuesses < maxGuesses ? <span>&nbsp;</span> : <span style={{color:"red"}}>{letter}</span>
        }
      </div>
    )}</div>
    )
    }
    </div>
      <div className="streakContainer">
        <span>Streak: {streak}{streak > 4 ? "🔥" : ""}</span>
      </div>
      <div className="letterContainer">
        {allLetters.map((letter) => 
          <button 
          onClick={() => currentGuesses < maxGuesses && !isGuessed ? addGuessLetter(letter) : ""}
          key={letter} 
          disabled={guessedLetters.includes(letter)}>
            {letter.toUpperCase()}
          </button>
        )}
      </div>
    </div>
    </div>
  )
}

export default App
