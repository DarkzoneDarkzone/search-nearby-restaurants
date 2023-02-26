<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class GoogleController extends Controller
{
    public function onGetRestaurants(Request $req)
    {
        try {
            // define google api key
            $API_KEY = env('GOOGLE_MAP_KEY');
            // receive value 'search' from client and encode value because some space make some error for us
            $search = ($req->input('search')) ? urlencode($req->input('search')) : "";
            // define url we use to get data from Google map api
            $url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query={$search}&key={$API_KEY}&language=th";

            // find Place by seach text
            // $this->fetchGoogleApi($url) it's function used to fetch data from Google map api with curl
            $response_place = $this->fetchGoogleApi($url);
            // check result is empty or not
            if (empty($response_place->results)) {
                return response([
                    'message' => 'error',
                    'description' => 'Not found place'
                ], 404);
            }
            // define $place equal first location from search result
            $place = $response_place->results[0];
            // set lat and lng to location, We will use $location to fetch nearby restaurants from Google map api
            $location = $place->geometry->location->lat . "," . $place->geometry->location->lng;
            // get cached data from redis by key like "search_Nai Mueang"
            $cachedResult = Redis::get('search_' . $place->formatted_address);
            // check cache data if we was searched we will return restaurants data from cached data  
            if (isset($cachedResult)) {
                // redis will keep data like string we will decode to JSON data
                $result = json_decode($cachedResult, FALSE);
                return response([
                    'message' => 'ok',
                    'description' => 'Get restaurants from cached success.',
                    'data' => [
                        'location' => $place->formatted_address,
                        'restaurants' => $result
                    ]
                ], 200);
            }
            // define $url to fetch data from Google map api
            $url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=".$location."&radius=5000&type=restaurant&key={$API_KEY}&language=th";
            // find nearby restaurants by location (12.213123132,12.56465465)
            $response_restaurants = $this->fetchGoogleApi($url);
            // check restaurants result is empty or not
            if (empty($response_restaurants->results)) {
                return response([
                    'message' => 'error',
                    'description' => 'Not found restaurants'
                ], 404);
            }
            // cache result to redis
            Redis::set('search_' . $place->formatted_address, json_encode($response_restaurants->results));
            return response([
                'message' => 'ok',
                'description' => 'Get restaurants success.',
                'data' => [
                    'location' => $place->formatted_address,
                    'restaurants' => $response_restaurants->results
                ]
            ], 200);
        } catch (Exception $e) {
            return response([
                'message' => 'error',
                'descrpition' => 'Something went wrong.',
                'errorMessage' => $e->getMessage()
            ], 500);
        }
    }
}
