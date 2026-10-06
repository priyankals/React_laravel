<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BondDetails;

class BondController extends Controller
{
    public function store(Request $request)
    {
        // 1. Validate the request
        $validatedData = $request->validate([
            'bondName' => 'required',
            'issuerType' => 'required',
            'trustee' => 'required',
            'registrar' => 'required',
            'leadManager' => 'required',
            'natureOfSecurity' => 'required',
            'stockExchange' => 'required'
        ]);


        // 2. Save data into database
        $bond = BondDetails::create([
            'bond_name' => $validatedData['bondName'],
            'issuer_type' => $validatedData['issuerType'],
            'trustee' => $validatedData['trustee'],
            'registrar' => $validatedData['registrar'],
            'lead_manager' => $validatedData['leadManager'],
            'nature_of_security' => $validatedData['natureOfSecurity'],
            'stock_exchange' => $validatedData['stockExchange']
        ]);


        // 3. Send response to React
        return response()->json([
            'message' => 'Bond saved successfully',
            'data' => $bond
        ], 201);
    }

    public function show($id)
{
    $bond = BondDetails::find($id);

    if (!$bond) {
        return response()->json([
            'message' => 'Bond not found'
        ], 404);
    }

    return response()->json($bond);
}


public function update(Request $request, $id)
{
    $bond = BondDetails::find($id);

    if (!$bond) {
        return response()->json([
            'message' => 'Bond not found'
        ], 404);
    }

    $bond->bond_name = $request->bondName;
    $bond->issuer_type = $request->issuerType;
    $bond->trustee = $request->trustee;
    $bond->registrar = $request->registrar;
    $bond->lead_manager = $request->leadManager;
    $bond->nature_of_security = $request->natureOfSecurity;
    $bond->stock_exchange = $request->stockExchange;

    $bond->save();

    return response()->json([
        'message' => 'Bond updated successfully'
    ]);
}

public function destroy($id)
{
    $bond = BondDetails::find($id);

    if (!$bond) {
        return response()->json([
            'message' => 'Bond not found'
        ], 404);
    }

    $bond->delete();

    return response()->json([
        'message' => 'Bond deleted successfully'
    ]);
}
}