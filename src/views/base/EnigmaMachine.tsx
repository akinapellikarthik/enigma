import React from 'react';
import { Keyboard, IKeyboardProps } from './components/Keyboard';
import './EnigmaMachine.css';
import { ConfiguredRotorSet } from './components/RotorSet';
import { EnigmaMachineState } from '../../stores/Stores';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { CumulativeOutputDigitalCapture } from './components/OutputDigitalCapture'

/**
 * Map the application state to keyboard input
 * @param state 
 */
const mapStateToInputKeyboardProps = (state:EnigmaMachineState): IKeyboardProps => {
    return {
        mode: 'input'
    };
};

/**
 * Map the application state to input keyboard
 * @param state 
 */
const mapStateToOutputKeyboardProps = (state:EnigmaMachineState): IKeyboardProps => {
    return {
        mode: 'output',
        highlight: state.output
    };
};

/**
 * Map the application state to display board
 * @param dispatch 
 */
const mapDispatchToInputKeyboardProps = (dispatch: Dispatch)  => {
    return {
        transitionEnigmaMachine: (key: string) => {
            dispatch({
                type: 'CALCULATE_ENIGMA_STATE',
                payload: {
                    input: key
                }
            });
        }
    };
};
/**
 * Input board
 */
const InputKeyBoard = connect(mapStateToInputKeyboardProps, mapDispatchToInputKeyboardProps)(Keyboard);
/**
 * Output board
 */
const DisplayBoard = connect(mapStateToOutputKeyboardProps)(Keyboard);

/**
 * The functional component representing the Overall UI for the enigma machine
 */
export const EnigmaMachine = () => {
    /**
     * Create the UI for the enigma machine
     */
    return <div className = "enigma-machine-root">
        <div className = 'enigma-io'>
            <DisplayBoard/>
            <p></p>
            <InputKeyBoard/>

        </div>
        <div className = 'enigma-rotor-and-display'>
            <ConfiguredRotorSet/>
            <p></p>
            <CumulativeOutputDigitalCapture/>
        </div>
    </div>;
};


