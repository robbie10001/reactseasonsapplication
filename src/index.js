import React from "react";
import ReactDOM from "react-dom";

/*
FUNCTION VERSUS CLASS

function App(){
    window.navigator.geolocation.getCurrentPosition(
        (position) => console.log(position),
        (err) => console.log(err),
        );
    
    return <div>Latitude:</div>
};
*/

/*
HOW CLASS BASED COMPONENTS WORK
When we make a class, we are creating a new class inside of JS with just one method assigned to it (render).
In order to use a class based component in REACT, it is expected that our class based components have many other methods attached to it.
We implement these methods not from ourself but from React.components. 
By using extends React.Component, we are allowing us to pull a bunch of functionality into our class from the React.Component class.
We are subclassing React.Component

*/
class App extends React.Component {
    //the constructor method is a good place to do our state initalisation.
    constructor(props) {
        super(props);
        //This is the only time we do direct assignment to this.state
        this.state = { lat: null, errorMessage: "" };

        window.navigator.geolocation.getCurrentPosition(
            position => {
                //to update our state object, we had to called setState. This is a function that gets put on our state object automatically when we extend React.Component
                //anytime we want to update our state we have to call setState
                this.setState({ lat: position.coords.latitude })
            },
    //example of error handling 
            err => {
            this.setState ({ errorMessage: err.message });
        }
        );
    }


/* COMPONENT DID MOUNT, COMPONENTDIDUPDATE, COMPONENTWILLUNMOUNT

The componentDidMount method is a perfect place to do some inital data loading for our component or to start some outside process (user position) if we only want to do this one time. 
The componentDidUpdate gets called everytime a component is updated. The componentDidUpdate method is a good place to do more data-loading when state/props change.  
componentWillunmount is used for when we want to remove a component from the screen. The componentWillUnmount method is a good place to do cleanup (especially for non-React stuff). 

*/

//React says we have to define render!! 
//the render method alone, is about return JSX and nothing else!
//we are not going make a user request or anything like this in the render method!
//In the below code, we are using conditional rendering! 
    render() {
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <div>Latitude: {this.state.lat}</div>
        }

        return <div>Don't Worry We are Loading!</div>

    }
}

ReactDOM.render(
    <App />,
    document.querySelector("#root")
)

/* 
WHAT IS A COMPONENT? 
1. A function or a class.
2. That produces HTML to show the user. (using JSX)S
3. And handes feedback from the user(using event handlers)
*/

/* 
DIFFERENCE BETWEEN FUNCTIONAL COMPONENTS AND CLASS COMPONENTS
1. Functional components are good for showing simple content to users without the use of much logic. 
2. Class components are good for almost everything else. If we complex logic, need to make network requests or need to respond to user input. 


BENEFITS OF CLASS COMPONENTS.
1. Easier code organization.
2. Can use "state", another react system.
3. Understands lifecycle events.
4. Easier to handlje user input. 
5. Easier to do things when the app first starts. 
*/

/* 
WHAT ARE WE GOING TO BUILD
1. We are building an app that is going to detect what season the user is in based on the time of year and the users location.
2. If the user is-northern hemisphere and its october-march or southern hemisphere and march/october (console.log("Burr, it's chilly!").
3. If the user is-northern hemisphere and is march/oct or southern hemispher and oct/march (console.log ("Let's hit the beach!")).

APP CHALLENGES 
1. Need to get the users physical location.
2. Need to determine the current month. 
3. Need to change text and styling based on location and month. 

WHAT COMPONENTS DO WE NEED FOR OUR BUILD?
1. App - has code to determine location and month
2. SeasonDisplay- Shows different text/icons based on props from our Apps (the users locations and stuff), the SeasonDisplay, will tell us and render information.
*/

/*
APP BUILD 
1. We are going to get semeantic.min.css (to handle styling).
2. We add this to our public folder and our index.html within the header as follows. 
3. https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css/>
4. In order to find out people's location, we are going to use the Geolocation API. 
5. 

*/

/* TIMELINE OF HOW APPLICATION LOADS IN A USERS BROWSER.L0
1. JS file loaded by browser.
2. App component gets created.
3. We call geolocation service.
4. App returns JSX, gets rendered to page as HTML
5. We get results of geolocation! 
6. Tell the component ot rerender itself with this new information!

*/

/* 
RULES OF CLASS COMPONENTS 
1. Must be a Javascript Class. 
2. Must extend (subclass) React.Component.
3. Must define a "render" method that returns some amount of JSX.
*/

/*
RULES OF STATE SYSTEM
1. Only usable with class components.(technically can be used with functional components using the 'hooks' stystem)
2. You will confuse props with state! 
3. 'State' is a JS object that contains data relevant to a component. 
4. Updating 'state' on a component cause the component to (almost) instantly rerender.
5. State must be initalized when a component is created
6. State can only be updated using the function 'setState'

*/


/*
USING STATE IN REACT
1. Make sure we initalize state when the component is first created.L0
2. Make sure we use state in our render method.L0
3. Make sure we update our state after we retrieve the data w want 

*/

/* 
HOW OUR COMPONENTS ACTUALLY RENDER AND WORK WITH STATE
1. JS file loaded by browser
2. Instance of App component is created. 
3. App components 'constuctor' function gets called.
4. state object is created and assigned to the this.state property. 
5. we call geolocation service (API)
6. React calls the components render method
7. App retruns JSX, gets render to page as HTML
8. We wait ...
9. We get result of geolocation 
10. we update our state object with a call to 'this.setState'
11. React sees that we update the state of a component
12. React calls our 'render' method a second time
13. Render method returns some (updated) JSX 
14. React takes that JSX and updates content to the screeen

*/

/* 
COMPONENT LIFE CYCLE METHOD.
1. A function we can opitionally define in a class based component. 
2. If we choose to call this method that are called my react in the components lifecycle.
3. The component lifesycle is as followed.L0
4. Constructor, render (content visable on screen), componentDidMount (sit and wait for updates...), componentDidUpdate(sit and ait until this component is not longer shown), componentWillUnmount. 

*/