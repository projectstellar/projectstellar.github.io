const instance = new TypeIt('#type-here', {
    strings: ['Welcome'],
    loop:true
    //-- Other options...
  })
  .pause(1500)
  .delete()
  .type('to HoloSteller')
  .pause(700)
  .delete(2)
  .type('ar.')
  .pause(1500)
  .delete()
  .type('A non-profit organisation')
  .pause(1500)
  .go();