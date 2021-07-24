#!/bin/bash

echo "Running Initialization Scripts"

echo "Configuing AWS configure"

aws configure set aws_access_key_id default_access_key
aws configure set aws_secret_access_key default_secret_key
aws configure set region eu-west-1

echo "Creating Table"

aws dynamodb \
--endpoint-url http://dynamodb-local:8000 create-table \
--table-name auth-table \
--attribute-definitions AttributeName=pk,AttributeType=S AttributeName=sk,AttributeType=S \
--key-schema AttributeName=pk,KeyType=HASH AttributeName=sk,KeyType=RANGE \
--provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5

echo "Finished Creating Table"

echo "Listing Tables"

aws dynamodb \
list-tables --endpoint-url http://dynamodb-local:8000 

echo "Deleting .build if exists"

[[ -d ./.build ]] && rm -r ./.build

yarn watch