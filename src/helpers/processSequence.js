/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import * as R from "ramda"

 const api = new Api();

const validateString = (str) => R.allPass([
    (str) => str.length < 10,
    (str) => str.length > 2,
    (str) => Number(str) > 0,
    RegExp.prototype.test.bind(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/)
])(str)

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
    const tapFn = (fn) => (value) => R.tap(fn, value)
    const useWriteLog = tapFn(writeLog)
    const apiRequest = (apiUrl, requestParams, newPipe) =>
        api.get(apiUrl, requestParams)
            .then(({result}) => newPipe(result))
            .catch((err) => handleError('API error:' + err))

    const convertNumberRequest = (newPipe) => (value) => apiRequest(
        'https://api.tech/numbers/base', {from: 10, to: 2, number: value}, newPipe)
    const animalTechRequest = (newPipe) => (value) => apiRequest(
        `https://animals.tech/${value}`, {}, newPipe)

    R.pipe(
        useWriteLog,
        tapFn((value) => {
            if (!validateString(value)) {
                handleError('ValidationError')
            }
        }),
        Number,
        Math.round,
        useWriteLog,
        convertNumberRequest(
            R.pipe(
                useWriteLog,
                R.length,
                useWriteLog,
                (v) => v * v,
                useWriteLog,
                (v) => v % 3,
                useWriteLog,
                animalTechRequest(
                    handleSuccess
                )
            )
        )
    )(value)
}

export default processSequence;
