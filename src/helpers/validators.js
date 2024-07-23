import shape from "@material-ui/core/styles/shape"
import * as R from "ramda"
/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

const isRed = color => color === 'red'
const isGreen = color => color === 'green'
const isBlue = color => color === 'blue'
const isOrange = color => color === 'orange'
const isWhite = color => color === 'white'

const createPrdicates = obj => {
    const predicates = Object.entries(obj).map(([shape, color]) => R.propEq(shape, color))
    // console.log(predicates)
    return R.allPass(predicates)
}

const isNotWhite = R.complement(isWhite)

const isAnyNotWhite = (objs) => objs.some(isNotWhite)


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (shapes) => {
    const correctInput = {
        star: 'red', 
        square: 'green', 
        triangle: 'white', 
        circle: 'white'
    }
    const checkColors = createPrdicates(correctInput)
    return checkColors(shapes)
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (sequense) => {
    const colors = {}
    for(let color of Object.values(sequense)) {
        colors[color] = colors[color] ? colors[color] + 1 : 1
    }
    
    if (colors.green >= 2) {
        return true
    }
    return false
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (sequense) => {
    const colors = {}
    for(let color of Object.values(sequense)) {
        colors[color] = colors[color] ? colors[color] + 1 : 1
    }
    
    if (colors.red === colors.blue) {
        return true
    }
    return false
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (shapes) => {
    const correctInput = {
        star: 'red', 
        square: 'orange', 
        circle: 'blue'
    }
    const checkColors = createPrdicates(correctInput)
    return checkColors(shapes)
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (sequense) => {
    const colors = {}
    for(let color of Object.values(sequense)) {
        colors[color] = colors[color] ? colors[color] + 1 : 1
    }
    
    if (colors.green >= 2) {
        return true
    }
    return false
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (shapes) => {
    const correctInput = {
        star: 'orange', 
        square: 'orange', 
        circle: 'orange',
        triangle: 'orange'
    }
    const checkColors = createPrdicates(correctInput)
    return checkColors(shapes)
};

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) => {
    const correctInput = {
        star: 'green', 
        square: 'green', 
        circle: 'green',
        triangle: 'green'
    }
    const checkColors = createPrdicates(correctInput)
    return checkColors(shapes)
};

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = () => false;
