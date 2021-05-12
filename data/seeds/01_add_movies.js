exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('movies_table')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('movies_table').insert([
        {
          id: 1,
          name: 'The Pianist',
          director: 'Roman Polanski',
          stars: 'Adrien Brody, Thomas Kretschmann, Frank Finlay',
          about:
            'A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto of World War II.  ',
        },
        {
          id: 2,
          name: 'The Shawshank Redemption (1994)',
          director: 'Frank Darabont',
          stars: 'Tim Robbins, Morgan Freeman, Bob Gunton',
          about:
            'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. ',
        },
        {
          id: 3,
          name: 'Fight Club',
          director: 'David Fincher',
          stars: 'Brad Pitt, Edward Norton, Meat Loaf',
          about:
            'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more. ',
        },
      ])
    })
}
