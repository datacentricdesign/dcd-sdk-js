# Javascript SDK

A Javascript SDK for the Data-Centric Design Hub

## Getting Started

Install or clone the repository with `git clone`

### Step 1 : Install Node JS and Typescript

#### Node JS 
Follow the step in the followed link : https://nodejs.org/en/download/
#### TypeScript
Type in the following command
`npm install -g typescript`

### Step 2 : Node JS dependencies
- `cd dcd-sdk-js`
- `npm install`

### Step 3 Connecting a Thing to the Hub

At this stage you need the credentials of the Thing you want to connect to the hub. If you do not have one yet, please sign in/sign up to the DCD Hub and create a Thing following the instructions here.

Right click at the root of your project (left panel) and create a file ‘random-data.ts’.

In this file, add the following lines to import the definition of a Thing and PropertyType from the Javascript SDK.

```ts
import {  Thing  } from '../entities/thing'
import { Property, PropertyType } from '../entities/property'
```

Then, we set the credential of our Thing. In Typescript/Javascript, it means we look at the environment variables to read the id and access token of our thing. To provide these information as environment variable, right click at the root of your project (left panel) and create a file ‘.env’.

In this file, type in the following and paste your id and access token after the equal signs.

```
THING_ID=
THING_TOKEN=
```


Note: If your are using Git, you do not want to track the file ‘.env’ with Git as it contains secrets. To avoid any mistake, the file .gitignore list all files, folders and extensions to ignore. Create a file ‘.gitignore’ and add a new line with ‘.env’.

Back into our python file, we can now import our credential. We load environment variables and access our id and token as follows:


```ts
import * as dotenv from 'dotenv'
import * as findconfig from 'find-config'

// The thing ID and access token
dotenv.config({ path: findconfig('.env') })
const THING_ID = process.env.THING_ID;
const THING_TOKEN = process.env.THING_TOKEN;
```

Note: In Javascript/Typescript, any line starting with a ‘/’ is a comment, to help understand what the code does but ignored by Javascript/Typescript when running the programme.

Next, we can instantiate a Thing with the credentials, with a JSON Object. We store this object in a variable called ‘my_thing’, which we will use to manage our Thing on the DCD Hub.

```ts
//Instantiate a thing with its credential
var my_thing = new Thing({
    thing_id : THING_ID,
    thing_token : THING_TOKEN,
})
```

Notes that all the entities parameters starts with her name, here we have *thing_id* for the things id, for persons it would be *person_id* and *property_id* for properties.

The following line ‘read’ the details of our Thing, meaning it connects the DCD Hub and asks for the information related to this Thing.

```ts
//We can fetch the details of our thing
my_thing.read()
```

We can use the method json() to get a JSON view of the Thing. We show the result in the console with the javascript function console.log(). If you just registered your Thing on the DCD Hub, it has only an Id, a name and a type. Notes that Typescript and Javascript are synchronous so we have to make a timeout or a promise to show data.

```ts
//1) With a time out
    setTimeout(function(){ 
    console.log(my_thing.json())
    }, 3000) //3 seconds before log the result.

//2) Or With a promise
    // 1st method with a .then()
    my_thing.read().then(() => {
    console.log(my_thing.json())
    })

    //2nd method with async/await
    async function read_thing(){
    await my_thing.read()
    console.log(my_thing.json())
    }
    read_thing()
```

To create a Property for our Thing, we can use the method find_or_create_property(). This method takes a property name and a property type as parameters, search for a property of the same name in the Thing, and return the property. If no property is found, it requests the creation of a new one on the DCD Hub and returns it. In the following example, we create a property with the name ‘My Random Property’ of type ‘THREE_DIMENSIONS’, meaning that every data point will be compose of three values.

```ts
//If we have no properties, let's create a random one
const my_property = my_thing.find_or_create_property("My Random Property",
PropertyType.THREE_DIMENSIONS)
```

Similar to the Thing, we can display the details of a Property with the method json().

```ts
async function create_property() {
    const my_property = await my_thing.find_or_create_property("My Random Property",
PropertyType.THREE_DIMENSIONS)
    console.log(my_property.json())
}
create_property()
```

Here we also need to resort to asynchronous techniques with find_or_create_propert() function. So here is how we can arrange the code from the begining :

```ts
my_thing.read().then(async () => {
    console.log('my_thing',my_thing.json())
    const my_property = await my_thing.find_or_create_property("My Random Property",
PropertyType.THREE_DIMENSIONS)
    console.log('my_property',my_property.json())
})
```

### Step 4 Execute the Typescript/Javascript code

Let's execute this code. Go to the terminal and type in the following command :

```bash
tsc random-data.ts
```

It should generate you a js file called *random-data.js*, after that type in :

```bash
node random-data.js
```

### Step 5 Sending Data

With this code we are ready to send data to the DCD Hub. To send random data, we are going to use two javascript functions, the first, *Math.random()* for generating random numbers, the second, *setInterval()* to set an interval between scripts (pausing the programme).

We create a function that send random values to the Hub. In this function we create an array with three random values and we call the method update_values(). This method prepare and send the array of data to the Hub.

```ts 
//Let's create a function that generate random values
function generate_dum_property_values(the_property : Property){
    //Define an array with 3 random values in range
    const values = [getRandomInRange(0,5,3),getRandomInRange(0,5,3),getRandomInRange(0,5,3)]
    //Update the values of the property
    the_property.update_values(values)
}

//Small function that return a random value between a range and with a fixed precision
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}
```
Finally, we can call this methods infinitely with a interval, waiting 2 seconds after each update.

```ts
//Finally, we call our function to start generating dum values
setInterval(function(){
    generate_dum_property_values(my_property)
    },2000) // 2 seconds break
```


Back in the terminal, stop your Javascript script with CMD+C (Ctrl+C).