// console.log('testing');
/*==============================================================================
  Setting up Spoonacular server response - f308c68870684766ae3372174c399412
==============================================================================*/
const myApiKey = "apiKey=f308c68870684766ae3372174c399412";
const recipeId = [];

const fetchRecipe = () => {
  $('form').on('submit', (event) => {
    event.preventDefault();
    let selection = document.activeElement.getAttribute('value');
    const userInput = $('.search-box').val()
    const userSearch = `&query=${userInput}&number=10`;
    // console.log(userSearch);
    const myData = $.ajax({
      url: "https://api.spoonacular.com/recipes/search?" + myApiKey + userSearch
    }).then(
      (data)=>{
        for (let i = 0; i < 10; i++) {
          recipeId.push(data.results[i])
          let $returnItems = $('<li>')
          $('.food-description').append($returnItems)
          $returnItems.addClass('item-container')
          let $recipe = $('<a>').text(data.results[i].title).attr('href', '#tab-2').on('click', fetchIngredients)
          $recipe.addClass(`top-recipes`).addClass(`${[i]}`)
          $returnItems.append($recipe)
        }
        console.log("good");
        // console.log(data);
        // console.log(recipeId);
      },
      ()=>{
        console.log('bad');
      }
    );
  })
}

/*==============================================================================
  Need to get the id from this ajax request and add another ajax request to add the id to a search based on a click, showing up in tabs two and three.

  ingredients
  https://api.spoonacular.com/recipes/{id}/ingredientWidget.json

  price
  https://api.spoonacular.com/recipes/{id}/priceBreakdownWidget.json
==============================================================================*/

const fetchIngredients = () => {
  for (let i = 0; i < recipeId.length; i++) {
    $.ajax({
      url: `https://api.spoonacular.com/recipes/${recipeId[i].id}/information?${myApiKey}`
    }).then(
      (data) => {
        let $returnIngredients = $('<li>')
        $('.ingredient-description').append($returnIngredients)
        $returnIngredients.addClass('item-container')
        let $ingredients = $('<a>').text(data.results[i].name)
        $recipe.addClass(`top-recipes`)
        $returnItems.append($recipe)
        console.log(data);
      },
      () => {
        console.log("it is borked");
      }
    )
  }
}

/*==============================================================================
  Tab Panel
==============================================================================*/

const searchTabs = () => {
  $('.tab-list').each(function(){
    let $current = $(this);
    let $tab = $current.find('li.active');
    let $click = $tab.find('a');
    let $panel = $($click.attr('href'));

    $this.on('click', '.tab-control', function(e) {
      // console.log('clicked');
      e.preventDefault();
      let $link = $(this);
// .hash reads the href of this(clicked) and grabs the first item with the #
      let id = this.hash;

// if statement that says if this $link is not active do this
// which removes the active classes from inactive elements
      if (id && !$link.is('.active')) {
        $panel.removeClass('active');
        $tab.removeClass('active');

// this clicked item is then set to active
        $panel = $(id).addClass('active');
        $tab = $link.parent().addClass('active');
      }
    });
  });
}

/*==============================================================================
  Onload functions
==============================================================================*/
$(() => {
  fetchRecipe();
  searchTabs();
  fetchIngredients()
  // format();
})
