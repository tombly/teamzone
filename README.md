# Teamzone

This is a simple app for keeping track of your team's timezones. Just add each member of your team and you can quickly see the current local time for everyone.

## Running the app locally

This app is written using Angular. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Deploying to Azure

A great way to host single page apps is to use static website hosting in Azure. Here's how to set it up using the Azure CLI. We'll assume that we have an existing resource group called `myrg` and need to create a new blob storage account called `mytz`.

Create a new storage account:

``` bash
az storage account create -n mytz -g myrg -l westus --sku Standard_LRS
```

Enable the static website feature:

```
az storage blob service-properties update --account-name mytz --static-website true --index-document index.html --404-document index.html 
```

Deploy the website:

```
ng build
az storage blob upload-batch --account-name mytz -s ./dist/teamzone -d '$web'
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
