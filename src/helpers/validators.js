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


const isNotColor = (predicate) => R.complement(predicate)
const shapeHasColor = (shape, colorChecker) => (shapes) => colorChecker(shapes[shape])

const createPredefinedColorChecker = (pattern) => R.allPass(
    Object.entries(pattern).map(
        ([shape, colorChecker]) => shapeHasColor(shape, colorChecker)
    )
)

const haveSameColor = (shapeA, shapeB) => (shapes) => shapes[shapeA] === shapes[shapeB]

const colorCounterPredicate = (colorChecker) => (shapes) => R.count(colorChecker, Object.values(shapes))


// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (shapes) => createPredefinedColorChecker(
    {star: isRed, square: isGreen, triangle: isWhite, circle: isWhite}
)(shapes)


// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (shapes) => colorCounterPredicate(isGreen)(shapes) >= 2

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (shapes) => colorCounterPredicate(isRed)(shapes) === colorCounterPredicate(isBlue)(shapes)

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (shapes) => createPredefinedColorChecker({circle: isBlue, star: isRed, square: isOrange})(shapes)

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).

export const validateFieldN5 = (shapes) => R.pipe(
    Object.values,
    R.countBy((c) => c),
    ({white, ...otherColors}) => otherColors,
    Object.values,
    (values) => Math.max(...values) >= 3
)(shapes)

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
const colorPredicateCounterEquals = (colorPredicate, count) => (shapes) => colorCounterPredicate(colorPredicate)(shapes) === count

export const validateFieldN6 = (shapes) => R.allPass([
    createPredefinedColorChecker({triangle: isGreen}),
    colorPredicateCounterEquals(isGreen, 2),
    colorPredicateCounterEquals(isRed, 1)
])(shapes)

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (shapes) => colorCounterPredicate(isOrange)(shapes) === shapes.length

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = ({star}) => R.allPass([isNotColor(isRed), isNotColor(isWhite)])(star)

// 9. Все фигуры зеленые.
export const validateFieldN9 = (shapes) => colorCounterPredicate(isGreen)(shapes) === shapes.length

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (shapes) => R.allPass([
    haveSameColor('triangle', 'square'),
    createPredefinedColorChecker({triangle: isNotColor(isWhite), square: isNotColor(isWhite)})
])(shapes)
