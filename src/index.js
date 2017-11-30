import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board';
import './styles/index.css';


class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                clickedField: undefined,
            }],
            stepNumber: 0,
            currentlyViewedMove: null,
            xIsNext: true,
        };
    }

    handleClick(i) {//co bedzie mial przekazane?
        const history = this.state.history.slice(0, this.state.stepNumber + 1);//przy pierwszym ruchu to jest array o jednym slocie
        const current = history[history.length - 1];//wskazuje ostatni ruch - caly obiekt
        const squares = current.squares.slice();//kopia arraya
        if (squares[i] || calculateWinner(squares).whoWon) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,//tu trzeba bylo oblec obiekt w ramki arraya
                clickedField: i
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        console.log("index.js state :");
        console.log(this.state);
        const current = history[this.state.stepNumber];
        const winnerInfo = calculateWinner(current.squares);


        const moves = history.map(
            (step, move) => {

                let klass = "";
                if (move === this.state.currentlyViewedMove) {
                    klass = "bolder";
                }

                const desc = move ?
                    'Go to move #' + move + '. It was ' + (step.clickedField % 3 + 1) + ' col and ' + Math.ceil(step.clickedField / 3) + ' row' :
                    'Go to game start';
                return (
                    <li key={move}>
                        <button
                            onClick={
                                () => {
                                    this.jumpTo(move);
                                    this.setState({currentlyViewedMove: move});
                                }
                            }
                            className={klass}
                        >{desc}</button>
                    </li>
                );
            }
        );

        //////STATUS//////////
        let status;
        if (winnerInfo.whoWon) {
            status = "Winner: " + winnerInfo.whoWon;
        } else {
            status = "Next player " + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winnerInfo={winnerInfo}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                    {/*its an array*/}
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] &&
            squares[a] === squares[b] && squares[a] === squares[c]) {
            return {whoWon: squares[a], set: lines[i]};
        }
    }
    return {whoWon: undefined, set: undefined};
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
