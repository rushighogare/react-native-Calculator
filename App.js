import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';

export default function App() {
    const [displayValue, setDisplayValue] = useState('0');
    const [operator, setOperator] = useState(null);
    const [firstValue, setFirstValue] = useState('');
    const [equation, setEquation] = useState(''); // New state for the equation

    const handleNumberInput = (num) => {
        if (displayValue === '0') {
            setDisplayValue(num.toString());
            setEquation(equation + num.toString());
        } else {
            setDisplayValue(displayValue + num);
            setEquation(equation + num.toString());
        }
    };

    const handleOperatorInput = (operator) => {
        setOperator(operator);
        setFirstValue(displayValue);
        setDisplayValue('0');
        setEquation(equation + ' ' + operator + ' ');
    };

    const handleEqual = () => {
        const num1 = parseFloat(firstValue);
        const num2 = parseFloat(displayValue);

        let result = 0;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
        }

        setDisplayValue(result.toString());
        setEquation(equation + ' = ' + result); // Show full equation with result
        setOperator(null);
        setFirstValue('');
    };

    const handleClear = () => {
        setDisplayValue('0');
        setOperator(null);
        setFirstValue('');
        setEquation(''); // Clear the equation
    };

    const renderButton = (content, onPress, buttonStyle = null, textStyle = null) => (
        <TouchableOpacity
            style={[styles.button, buttonStyle]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, textStyle]}>{content}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.calculatorBody}>
                <View style={styles.displayContainer}>
                    <Text style={styles.equationText} numberOfLines={1} adjustsFontSizeToFit>
                        {equation} {/* Show the equation */}
                    </Text>
                    <Text style={styles.displayText} numberOfLines={1} adjustsFontSizeToFit>
                        {displayValue}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <View style={styles.row}>
                        {renderButton('C', handleClear, styles.specialButton, styles.specialButtonText)}
                        {renderButton('±', () => {}, styles.specialButton, styles.specialButtonText)}
                        {renderButton('%', () => {}, styles.specialButton, styles.specialButtonText)}
                        {renderButton('÷', () => handleOperatorInput('/'), styles.operatorButton, styles.operatorButtonText)}
                    </View>
                    <View style={styles.row}>
                        {renderButton('7', () => handleNumberInput(7))}
                        {renderButton('8', () => handleNumberInput(8))}
                        {renderButton('9', () => handleNumberInput(9))}
                        {renderButton('×', () => handleOperatorInput('*'), styles.operatorButton, styles.operatorButtonText)}
                    </View>
                    <View style={styles.row}>
                        {renderButton('4', () => handleNumberInput(4))}
                        {renderButton('5', () => handleNumberInput(5))}
                        {renderButton('6', () => handleNumberInput(6))}
                        {renderButton('−', () => handleOperatorInput('-'), styles.operatorButton, styles.operatorButtonText)}
                    </View>
                    <View style={styles.row}>
                        {renderButton('1', () => handleNumberInput(1))}
                        {renderButton('2', () => handleNumberInput(2))}
                        {renderButton('3', () => handleNumberInput(3))}
                        {renderButton('+', () => handleOperatorInput('+'), styles.operatorButton, styles.operatorButtonText)}
                    </View>
                    <View style={styles.row}>
                        {renderButton('0', () => handleNumberInput(0), styles.zeroButton)}
                        {renderButton('.', () => {})}
                        {renderButton('=', handleEqual, styles.equalButton, styles.equalButtonText)}
                    </View>
                </View>
                <Text style={styles.signature}>Cal by Rushikesh</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E1E1E',
        alignItems: 'center',
        justifyContent: 'center',
    },
    calculatorBody: {
        width: 320,
        backgroundColor: '#2D2D2D',
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    displayContainer: {
        height: 120,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 10,
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        marginBottom: 15,
    },
    equationText: {
        fontSize: 20,
        color: '#AAAAAA',
        textAlign: 'right',
    },
    displayText: {
        fontSize: 48,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    buttonContainer: {
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
    },
    button: {
        width: 65,
        height: 65,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3D3D3D',
        borderWidth: 1,
        borderColor: '#4D4D4D',
    },
    buttonText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    specialButton: {
        backgroundColor: '#4A4A4A',
        borderColor: '#5A5A5A',
    },
    specialButtonText: {
        color: '#FF9500',
    },
    operatorButton: {
        backgroundColor: '#4A4A4A',
        borderColor: '#5A5A5A',
    },
    operatorButtonText: {
        color: '#0A84FF',
    },
    equalButton: {
        backgroundColor: '#32D74B',
        borderColor: '#32D74B',
    },
    equalButtonText: {
        color: '#FFFFFF',
        fontSize: 30,
    },
    zeroButton: {
        width: 138,
    },
    signature: {
        color: '#8E8E93',
        textAlign: 'center',
        marginTop: 15,
        fontSize: 12,
    },
});