
# Appshell Thempate based on Polymer App Starter Kit with Bootstrap

-------------------------------------

## Project Structure

```
/images             -- image assets
/fonts              -- fonts for app
/src                -- root directory 
  /sass             -- styling compiled for core-styles.html
  /pages            -- any pages needed to route view
  /components       -- holds all atomic design structure
    /organisms
    /molecules
    /atoms
  core-app.html     -- root shell contains layout with drawer and header that routes to pages
  core-style.html   -- global css for app
/test
index.html
bower.json
package.json
polymer.json

```

## Atomic Structure

```
SECTION: HEADER
    Molecules:
    
    Hero Block
    
    Hero Image — sass
    Hero Title — sass
    Hero Lead — sass
    Hero Divider — sass
    Icon Button — sass
    Carousel
    
    router — component
    thumbs — component + sass
    
SECTION: OPT IN
    Molecules:
    
    Parallax Block (app-box)
    
    background colour (attribute) - component + attribute
    Atoms:
    
    Opt in Body
    Outline Button
    
SECTION: LOCATION
    Molecules:
    
    Title 
    
    H1
    Paragraph Lead
    Nav Tab
    
    route
    H3
    Map Embed
    
    google integration attributes
    
CTA List

    icon
    paragraph body
    
HOURS list

    paragraph body
    layout
    
    
    Atom:
    
    List Headings H3



SECTION: QUOTE SECTION

    Molecules
    
    Parallax Block
    
    Quote Block
    
    Citation
    Reference
    Icon
    Atom
    
    Link button


SECTION: GALLERY
Molecules:

Video Block

Icon overlay
lightbox
Image Block

Icon overlay
lightbox
```


-------------------------------------

[![Build Status](https://travis-ci.org/PolymerElements/polymer-starter-kit.svg?branch=master)](https://travis-ci.org/PolymerElements/polymer-starter-kit)

This template is a starting point for building apps using a drawer-based
layout. The layout is provided by `app-layout` elements.

This template, along with the `polymer-cli` toolchain, also demonstrates use
of the "PRPL pattern" This pattern allows fast first delivery and interaction with
the content at the initial route requested by the user, along with fast subsequent
navigation by pre-caching the remaining components required by the app and
progressively loading them on-demand as the user navigates through the app.

The PRPL pattern, in a nutshell:

* **Push** components required for the initial route
* **Render** initial route ASAP
* **Pre-cache** components for remaining routes
* **Lazy-load** and progressively upgrade next routes on-demand

### Migrating from Polymer Starter Kit v1?

[Check out our blog post that covers what's changed in PSK2 and how to migrate!](https://www.polymer-project.org/1.0/blog/2016-08-18-polymer-starter-kit-or-polymer-cli.html)

### Setup

##### Prerequisites

Install [polymer-cli](https://github.com/Polymer/polymer-cli):

    npm install -g polymer-cli

##### Initialize project from template

    mkdir my-app
    cd my-app
    polymer init starter-kit

### Start the development server

This command serves the app at `http://localhost:8080` and provides basic URL
routing for the app:

    polymer serve --open


### Build

This command performs HTML, CSS, and JS minification on the application
dependencies, and generates a service-worker.js file with code to pre-cache the
dependencies based on the entrypoint and fragments specified in `polymer.json`.
The minified files are output to the `build/unbundled` folder, and are suitable
for serving from a HTTP/2+Push compatible server.

In addition the command also creates a fallback `build/bundled` folder,
generated using fragment bundling, suitable for serving from non
H2/push-compatible servers or to clients that do not support H2/Push.

    polymer build

### Preview the build

This command serves the minified version of the app at `http://localhost:8080`
in an unbundled state, as it would be served by a push-compatible server:

    polymer serve build/unbundled

This command serves the minified version of the app at `http://localhost:8080`
generated using fragment bundling:

    polymer serve build/bundled

### Run tests

This command will run
[Web Component Tester](https://github.com/Polymer/web-component-tester) against the
browsers currently installed on your machine.

    polymer test

### Adding a new view

You can extend the app by adding more views that will be demand-loaded
e.g. based on the route, or to progressively render non-critical sections
of the application.  Each new demand-loaded fragment should be added to the
list of `fragments` in the included `polymer.json` file.  This will ensure
those components and their dependencies are added to the list of pre-cached
components (and will have bundles created in the fallback `bundled` build).