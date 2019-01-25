// STEPS:
// ------
// 1. get the names of all repo.
// 2. for each repo get the names of contributors
// 3. build the JSON with name, img, url for all the contributors
// 4. finally send it to s3

// WHEN A NEW CONTRIBUTOR MAKES A CONTRIBUTION:
// --------------------------------------------
// 1. fetch the file from s3.
// 2. check if the user exists.
// 3. if user exists do nothing.
// 4. if user doesn't exist in the s3 file then add the user.


//AWS LAMBDA
var http = require("https");
const AWS = require('aws-sdk');
const S3_BUCKET_NAME = "pr-webhook-contributors-json";
const S3_FILE_NAME = "contributors.json";

exports.handler = async (event) => {
    // Run everytime a PR is merged
    // console.log(JSON.parse(event.body));
    return get_repos();
};

var contributors = [];

function get_repos() {
    return new Promise((resolve, reject) => {
        var options = {
            "method": "GET",
            "hostname": "api.github.com",
            "path": "/orgs/codeuino/repos",
            "headers": {
                "cache-control": "no-cache",
                "Postman-Token": "d2c5fb9b-9162-4826-8f38-d678ec7d231f",
                "User-Agent": "codeuino"
            }
        };

        var promise1 = new Promise((resolve, reject) => {

            var req = http.request(options, function(res) {
                var chunks = [];

                res.on("data", function(chunk) {
                    chunks.push(chunk);
                });

                res.on("end", function() {
                    var body = Buffer.concat(chunks);
                    var parsed_body = JSON.parse(body.toString());
                    var promiseArray = [];
                    parsed_body.forEach(function(element) {
                        var repo_name = element.full_name
                        // console.log(repo_name);
                        promiseArray.push(get_contributors(repo_name));
                    });
                    Promise.all(promiseArray).then(function() {
                        resolve();
                    })
                });
            });
            req.end();
        })

        promise1.then(function() {
            var unique = {};
            var distinct_contributors_list = [];
            for (var i in contributors) {
                if (typeof(unique[contributors[i].name]) == "undefined") {
                    distinct_contributors_list.push(contributors[i]);
                }
                unique[contributors[i].name] = 0;
            }
            console.log(distinct_contributors_list);

            // Pushing to S3

            var s3 = new AWS.S3();
            var s3Params = {
                Bucket: S3_BUCKET_NAME,
                Key: S3_FILE_NAME,
                Body: JSON.stringify(distinct_contributors_list),
                ACL: 'public-read'
            };
            s3.putObject(s3Params, function(err, data) {
                if (err) {
                    const response = {
                        statusCode: 500,
                        body: JSON.stringify(err),
                    };
                    resolve(response);
                } else {
                    const response = {
                        statusCode: 200,
                        body: JSON.stringify('OK!'),
                    };
                    resolve(response);
                }
            });
        });
    })
}


function get_contributors(repo_name) {
    var http = require("https");

    var options = {
        "method": "GET",
        "hostname": "api.github.com",
        "path": "/repos/" + repo_name + "/contributors",
        "headers": {
            "Accept": "application/json",
            "cache-control": "no-cache",
            "User-Agent": "codeuino",
        }
    };

    return new Promise((resolve, reject) => {

        var req = http.request(options, function(res) {
            var chunks = [];

            res.on("data", function(chunk) {
                chunks.push(chunk);
            });

            res.on("end", function() {
                var body = Buffer.concat(chunks);
                // console.log(body.toString());
                var getting_contributors_list_from_github_json = JSON.parse(body.toString());

                getting_contributors_list_from_github_json.forEach(function(element) {
                    var user_name = element.login;
                    var user_image = element.avatar_url;
                    var user_github_url = element.url;
                    // console.log("Name: ",user_name,"\nImage URL: ",user_image, "\nAccount URL",user_github_url);
                    contributors.push({
                        name: user_name,
                        image: user_image,
                        url: "https://github.com/" + user_name,
                        repo: repo_name
                    })
                });
                // console.log(repo_name);
                resolve();
                // var s3 = new AWS.S3();
                // var s3Params = {
                //     Bucket: S3_BUCKET_NAME,
                //     Key: S3_FILE_NAME,
                //     Body: JSON.stringify(contributors),
                //     ACL: 'public-read'
                // };
                // s3.putObject(s3Params, function(err, data) {
                //     if (err) {
                //         const response = {
                //             statusCode: 500,
                //             body: JSON.stringify(err),
                //         };
                //         resolve(response);
                //     } else {
                //         const response = {
                //             statusCode: 200,
                //             body: JSON.stringify('OK!'),
                //         };
                //         resolve(response);
                //     }
                // });
            });
        });
        req.end();
    });
}

// get_repos();