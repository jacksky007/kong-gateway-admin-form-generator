# kong-gateway-admin-form-generator
Generate form based on schema returned by Kong Gateway admin API

This project tries to build a generic form generator accroding to Kong Gateway admin API, so admin use can create new entities and plugins.

## Project tech info
|||
|-|-
|JS Framework|https://reactjs.org/|
|Development tool|[Parcel.js](https://parceljs.org/)|
|Programming Languages|[Typescript](https://www.typescriptlang.org/), [Stylus](https://stylus-lang.com/), [Pug](https://pugjs.org/api/getting-started.html)|
|UI Components|[antd](https://github.com/ant-design/ant-design/)

# How to use
## Prerequisites
* Node.js installed
* Kong Gateway running

## Steps
1. run `npm install` to install dependencies
2. run `npm run dev` to start local dev server
    * if the Kong Gateway is running in the same server, which means it can be reached by `http://localhsot:8001`, just running `npm run dev` is OK
    * otherwise enviroment variable `KONG_GATEWAY` should be set to the server address, so run `KONG_GATEWAY=http://your_kong_gateway_host:port npm run dev`. see details in .proxyrc.js
3. visit the url shown by `npm run dev`, the default url is `http://localhost:1234`

# Capabilities
|supported types|rules|
|---------------|-|
|array          | only support string elements|
|boolean        | √|
|integer        | √|
|map            | render only, unable to add values|
|number         | √|
|set            | only support string elements
|string         | √|

|supported rules|for what types|
|---------------|--------------|
|between        |integer,numbner|
|contains       |array|
|gt             |integer,number|
|is_regex       |string, array and set of string elements|
|len_eq         |string, array and set of string elements|
|len_max        |string, array and set of string elements|
|len_min        |string, array and set of string elements|
|match          |string, array and set of string elements|
|match_all      |string, array and set of string elements|
|match_any      |string, array and set of string elements|
|match_none     |string, array and set of string elements|
|required       |array,boolean,integer,number,set,string|
|starts_with    |string, array and set of string elements|

Due to time limitation, these type and rules have not been implemented yet.
|unsupport types|
|---------------|
|foreign|
|record|

|unsupport rules|
|---------------|
|custom_validator|
|mutually_exclusive_subsets|

## submit form to Kong Gateway API
Up to now, their are some violations retured by server.
So a modal is shown displaying error messages after clicking submit button.
# Documentation links

## how to install Kong Gateway
https://docs.konghq.com/gateway/latest/install-and-run/docker/
## schema
https://docs.konghq.com/gateway/latest/plugin-development/plugin-configuration/#describing-your-configuration-schema


# Time cost of this project
| Actions | Time |
|---------|------|
| read documents | ~20h |
| install vms & docker containers,<br> debug admin APIs | ~5h |
| set up project structure | ~2h |
| implements components & validators | ~20h|
| write this README| ~2h|
| add test suits | N/A |
| Total|~50h|
