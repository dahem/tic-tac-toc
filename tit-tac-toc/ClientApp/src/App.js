import React, { useState, useEffect } from 'react';
import './app.css';

function App() {
    const [winners, setWinners] = useState([]);
    const [mat, setMat] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

    const [turn, setTurn] = useState(0); // 0 player 1 // 1 player 2
    const [player1, setPlayer1] = useState('player 1');
    const [player2, setPlayer2] = useState('player 2');

    const [win, setWin] = useState(false);

    const getWinners = async () => {
        try {
            const response = await fetch('winner');
            const data = await response.json();
            setWinners(data);
        }
        catch (e) {
            console.log(e);
        }
    }


    const createWinner = async () => {
        try {
            const response = await fetch('winner', {
                method: 'POST',
                body: JSON.stringify({ name: getWinner() }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log("create");
            //const data = await response.json();
            console.log("get");
            await getWinners();
        }
        catch (e) {
            console.log(e);
        }
    }

    const checkList = arr => arr[0] === arr[1] && arr[0] === arr[2] && arr[0] !== ""; 

    const checkWin = () => {
        //horizontal
        for (let i = 0; i < 3; i++) {
            const row = []; 
            for (let j = 0; j < 3; j++) {
                row.push(mat[i][j]);
            }
            if (checkList(row)) return true;
        }
        //vertical
        for (let j = 0; j < 3; j++) {
            const col = [];
            for (let i = 0; i < 3; i++) {
                col.push(mat[i][j]);
            }
            if (checkList(col)) return true;
        }
        // diagonal
        return checkList([mat[0][0], mat[1][1], mat[2][2]]) || checkList([mat[2][0], mat[1][1], mat[0][2]]);
    }  

    const onChange = (i, j) => {
        const newMat = [...mat];
        if (newMat[i][j] !== '' || checkWin()) return;
        const value = turn === 0 ? 'x' : 'o';
        newMat[i][j] = value;
        
        setMat(newMat);
        setTurn((turn + 1) % 2);
    };

    const getPlayer = () => {
        return turn === 0 ? player1 : player2;
    };

    const getWinner = () => {
        return turn === 0 ? player2 : player1;
    };

    const clear = () => {
        setMat([['', '', ''], ['', '', ''], ['', '', '']]);
        setTurn(0);
        setWin(false);
    };

    useEffect(() => {
        getWinners();
    }, []);

    useEffect(() => {
        console.log('widfsfsdfsdn!!!!', win);
        if (checkWin()) {
            console.log('win!!!!');
            createWinner();
        }
    }, [mat]);

    return (
        <div style={{ margin: 20 }}>
            <div>winner list</div>
            <ul>
                {winners.map(winner => (
                    <li key={winner.id}>{winner.name}</li>
                ))}
            </ul>
            <div>nick players</div>
            <input type="text" value={player1} onChange={(e) => setPlayer1(e.target.value)} />
            <input type="text" value={player2} onChange={(e) => setPlayer2(e.target.value)} />

            {!checkWin() && <div>play {getPlayer()}</div>}
            <div>{player1}: x, {player2}: o, click on cell</div>
            <table style={{ width: 105 }}>
                <tbody>
                    <tr>
                        <th><button className="cell" onClick={() => onChange(0, 0)}>{mat[0][0]}</button></th>
                        <th><button className="cell" onClick={() => onChange(0, 1)}>{mat[0][1]}</button></th>
                        <th><button className="cell" onClick={() => onChange(0, 2)}>{mat[0][2]}</button></th>
                    </tr>
                    <tr>
                        <th><button className="cell" onClick={() => onChange(1, 0)}>{mat[1][0]}</button></th>
                        <th><button className="cell" onClick={() => onChange(1, 1)}>{mat[1][1]}</button></th>
                        <th><button className="cell" onClick={() => onChange(1, 2)}>{mat[1][2]}</button></th>
                    </tr>
                    <tr>
                        <th><button className="cell" onClick={() => onChange(2, 0)}>{mat[2][0]}</button></th>
                        <th><button className="cell" onClick={() => onChange(2, 1)}>{mat[2][1]}</button></th>
                        <th><button className="cell" onClick={() => onChange(2, 2)}>{mat[2][2]}</button></th>
                    </tr>
                </tbody>
            </table>
            <div style={{ marginTop: 10 }}>
                {checkWin() && <div>congratulations {getWinner()}</div>}
                <button onClick={() => clear()}>reset</button>
            </div>
        </div>
    );
}


export default App;