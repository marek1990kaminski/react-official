import React from 'react';

const Square = (props) => {

    const number = props.number;
    const set = props.winnerInfo.set;
    let klass = '';

    if (set) {
        if (set.indexOf(number) !== (-1)) {
            klass = 'square colored';
        }else{
            klass = 'square';
        }
    } else {
        klass = 'square';
    }


    console.log('props in square.js: ');
    console.log(props);
    return (
        <button className={klass} onClick={props.onClick}>
            {props.value}
        </button>
    );
}


export default Square;