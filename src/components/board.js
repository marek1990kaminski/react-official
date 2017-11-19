import React from 'react';
import Square from './square';

class Board extends React.Component {

    renderSquare(i) {
        console.log("WC in board " + this.props.winnerInfo);
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                winnerInfo={this.props.winnerInfo}
                number={i}
            />
        )
    }

//this method is completelly additional, we may do without it
    manySquares(start, end) {
        const squares = [];

        for (let i = start; i <= end; i++) {
            squares.push(this.renderSquare(i));
        }
        return squares;
    };

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.manySquares(0, 2)}
                    {/*{this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}*/}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

export default Board;