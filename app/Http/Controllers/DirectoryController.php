<?php

namespace App\Http\Controllers;

use App\Models\Directory;
use Illuminate\Http\Request;
use App\Http\Requests\Directory as DirectoryRequest;

class DirectoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            return Directory::all();
        } catch (\Exception $e) {
            echo $e;
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(DirectoryRequest $request)
    {
        try {
            Directory::create($request->all());
            return response('success', 200);    
        } catch (\Exception $e) {
            echo $e;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Directory  $directory
     * @return \Illuminate\Http\Response
     */
    public function show(Directory $directory)
    {
        try {
            return $directory;
        } catch (\Exception $e) {
            echo $e;
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Directory  $directory
     * @return \Illuminate\Http\Response
     */
    public function update(DirectoryRequest $request, Directory $directory)
    {
        try {
            $directory->update($request->all());
            return response('updated', 200);    
        } catch (\Exception $e) {
            echo $e;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Directory  $directory
     * @return \Illuminate\Http\Response
     */
    public function destroy(Directory $directory)
    {
        try {
            $directory->delete();
            return response('',204);    
        } catch (\Exception $e) {
            echo $e;
        }
    }
}
