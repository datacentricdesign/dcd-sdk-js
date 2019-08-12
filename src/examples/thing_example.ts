import {  Thing  } from '../entities/thing'
import { Property, PropertyType } from '../entities/property'
import * as dotenv from 'dotenv'
import * as findconfig from 'find-config'


// The thing ID and access token
dotenv.config({ path: findconfig('.env') })
const THING_ID = process.env.THING_ID;
const THING_TOKEN = process.env.THING_TOKEN;

var my_thing = new Thing({
    id : THING_ID,
    token : THING_TOKEN,
})

my_thing.read().then(async () => {
    console.log('my_thing',my_thing.json())
    const my_property = await my_thing.find_or_create_property("ope",PropertyType.THREE_DIMENSIONS)
    console.log('my_property',my_property.json())
    setInterval(function(){
    generate_dum_property_values(my_property)
    },2000)
})

function generate_dum_property_values(the_property : Property){
    const values = [getRandomInRange(0,5,3),getRandomInRange(0,5,3),getRandomInRange(0,5,3)]
    the_property.update_values(values)
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
}



