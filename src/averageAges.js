'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateAverage(array) {
  return array.reduce((sum, diff) => sum + diff, 0) / array.length;
}

function calculateMenAverageAge(people, century) {
  let men;

  century ? (
    men = people.filter(person => person.sex === 'm')
      .filter(person => Math.ceil(person.died / 100) === century)
  ) : (
    men = people.filter(person => person.sex === 'm')
  );

  const ages = men.map(person => person.died - person.born);

  return calculateAverage(ages);
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average ave of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find the other who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren) {
  let women;

  withChildren ? (
    women = people.filter(woman => people.some(someone => someone.mother
      === woman.name))
  ) : (
    women = people.filter(person => person.sex === 'f')
  );

  const ages = women.map(woman => woman.died - woman.born);

  return calculateAverage(ages);
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a mother and her
 * child in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for mothers who have son.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  let children;
  const boys = people.filter(person => person.sex === 'm');

  onlyWithSon ? (
    children = boys.filter(boy => people.some(someone => someone.name
      === boy.mother))
  ) : (
    children = people.filter(person => people.some(someone => someone.name
      === person.mother))
  );

  const ageDiffs = children.map(child =>
    child.born - people.find(mother => child.mother === mother.name).born);

  return calculateAverage(ageDiffs);
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
