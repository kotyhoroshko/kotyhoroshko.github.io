// Create functions that use const declarations
console.log (' --= excercise6 =-- ')
function excercise6() {
    // TODO: declare a const PI and assign value 3.14
    // TODO: declare a function which calculates a circle area, takes radius as a parameter
    // TODO: call the function and print the result to console
    const PI = 3.14;
    function getCircleArea (r: number): number {
        let s = PI*r*r
        return s
    }

    // TODO: check the type of PI variable
    console.log(typeof PI)
    
    // TODO: declare a const variable that is an object with two properties - name and age
    const person = {
        name: 'Laslo',
        age: 33
    }
    console.log(person)

    // TODO: declare a function which takes a person object as a parameter and increments age by 1
    // TODO: call the function and print the person object to console
    function add1Year(person:{age: number, name: string}) {
       person.age ++
       console.log ('Now person is '+person.age +' years old')
    }
    add1Year(person)
  }
  excercise6();
  

  console.log (' --= excercise7 =-- ')
  // Create a function that takes as a first parameter an array of numbers
  // a second parameter - a function that takes a number and returns a number
  // and returns a new array with the results of function called on each element of the array (function passed as a first parameter)
  function excercise7() {
    let arr: [number, number, number] = [10, 20, 30]
    function multipleBy3(value: number): number {
      return value*3
    };

    function map(arr: [number, number, number], callback: Function) {
      for (let index = 0; index < arr.length; index++) {
        arr[index] = callback(arr[index]);
      }
      return arr;
    }
    console.log(map(arr, multipleBy3))

    // TODO: create an array of numbers
    // TODO: create a function which doubles a number
    // TODO: call map function (created earlier) with the array and the function
    // TODO: print the result to console
    function multipleBy2(value: number): number {
      return value*2
    };
    console.log('Doubles a number: '+map(arr, multipleBy2))
  }
  // TODO: compile and run the code
  excercise7();
  
  
  // declare a function which takes a user and prints greeting to console
  function excercise8() {
    console.log (' --= excercise8 =-- ')
    // TODO: create a type for user, with name property
    // TODO: create a function with name printGreeting, which takes a user and prits greeting to console
    type TUser = {name: string}
    let user: TUser = {name: 'Jimmy'}
    function greeting(user: TUser) {
      console.log("How you doing "+ user.name+"?")
    }
    greeting(user)


    // TODO: create a type for product, with name property and price property
    // TODO: create a product object, asign it some object literal
    type TProduct = {name: string, price: number};
    let apple: TProduct = {name: 'Motorola', price: 200};

    // TODO: call the function with product as a parameter
    // TODO: call the function with object literal as a parameter
    function showPrice(product: TProduct) {
      console.log(product.name+': '+product.price+'$')
    }
    showPrice(apple)
    showPrice({name: 'Audi', price: 31000})
    
    // TODO: try adding extra property to the object literal - observe the error
    // TODO: fix the error with type assertion
    // showPrice({name: 'Renault', price: 27000, art: '00467'})
    showPrice({name: 'Renault', price: 27000, art: '00467'} as TProduct)
  }
  // TODO: compile and run the code
  excercise8();
  
  
//   // declare a `Book` class with a constructor and a method
  function excercise9() {
    console.log (' --= excercise9 =-- ')
    // TODO: declare a `Book` class with a constructor and a method `getInfo` which returns the book info as a string
    // TODO: constructor should take three parameters - title and year of publication
    // TODO: method `getInfo` should return the book title and year as a string
    // TODO: add a new method `getAge` which returns the age of the book (current year - year of publication)
    // TODO: add a new method `revise` which takes a new year as a parameter and updates the year property, add validation to the method - year can not be in the future, year can not be less than prev year
    class Book {
      title: string;
      year: number;
      author: string;
      constructor(title: string, year: number, author: string) {
        this.title = title;
        this.year = year;
        this.author = author;
      }

      getInfo(): string{
        return `"${this.title}" by ${this.author} in ${this.year}`
      }
      getAge () {
        let age: number = new Date().getFullYear() - this.year
        return `${this.title} was writen ${age} years ago`
      }
      revise (newYear: number) {
        if (newYear >= new Date().getFullYear()) {
          console.log("Year can not be in the future, year can not be less than prev year")
        }
        else {
          this.year = newYear
          console.log('Year was changed: '+kobzar.getInfo())
        }
     }
    }

    // TODO: create a book object and call the method `getInfo`, print the result to console
    // TODO: assign a new value to the year property
    // TODO: call the method `getInfo` again
    const kobzar = new Book('Kobzar', 1840, 'Shevchenko T.G.')
    console.log(kobzar.getInfo())
    kobzar.year = 1844
    console.log(kobzar.getInfo())

    // TODO: call the method `getAge` and print the result to console
    console.log(kobzar.getAge())

    // TODO: call the method `revise` and pass a new year as a parameter
    kobzar.revise(2020)

    // TODO: add private modifier to the year property
    // TODO: try to access the year property from outside of the class - observe the error
    // TODO: change protected modifier to the year property, remove private modifier

    // TODO: create a subclass `Magazine` which extends `Book` class
    // TODO: add a new properties `month` and `day` to the `Magazine` class
    // TODO: add constructor override to the Magazine class which takes four parameters - title, year, month and day
    // TODO: use super keyword to call the `Book` class constructor with title and year parameters
    class Magazine extends Book {
      month: number;
      day: number;
      constructor(title: string, year: number, month: number, day: number, author: string ) {
        super(title, year, author)
        this.month = month;
        this.day = day;
      }

      // TODO: add a method override `getInfo` to the `Magazine` class which prints the magazine info to console
      // TODO: use super keyword to call the `getInfo` method of the `Book` class
      getInfo(): string {
        let getYearAndTitle = super.getInfo()
        return `${getYearAndTitle}/${this.month}/${this.day}`
      }
    }

    // TODO: create a magazine object and call the method `getInfo`, print the result to console
    const times = new Magazine('Times', 1990, 6, 14, 'J.Doe')
    console.log(times.getInfo())

    // TODO: call the inherited method `getAge` of the magazine object and print the result to console
    console.log(times.getAge())
  }
  // TODO: compile and run the code
  excercise9();
  