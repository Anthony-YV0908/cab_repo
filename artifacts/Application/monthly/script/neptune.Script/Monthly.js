function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit" 
  }).split('/').map(part => part.padStart(2, '0')).join('/');
}




async function fetchServiceType(perairlineinput) {
  const apiUrl = `http://localhost:8080/api/entity/airportcode?where={"Code":"${perairlineinput}"}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("Failed to fetch service type data.");
  }

  const data = await response.json();
  if (data.length === 0) {
    throw new Error("No matching data found for the AOC code.");
  }

  return data[0].Service_Type;
}

async function Monthly() { // Made the function async
  try {
    const monthlydate = new Date(PerMonthly.getValue());
    const airportinput = AirportMonthlyInput.getValue();
    const perairlineinput = PerMonthlyInput.getValue();




    const formattedStartDate = formatDate(monthlydate);

    const carrier = await fetchServiceType(perairlineinput); // Await the fetch

    const monthly = {
      data: {
        "Month": formattedStartDate,
        "Airline": perairlineinput,
        "Carrier": carrier,
        "Airport": airportinput
      }
    };

    console.log(monthly);

 setTimeout(() => {
      apiMonthly(monthly); // Call the API with the constructed object
      console.log("successfully fetched");
    }, 2000);

  } catch (error) {
    console.error("Error in Monthly function:", error);
  }
}




async function Monthly() { 
  try {
    const monthlydate = new Date(PerMonthly.getValue());
    const airportinput = AirportMonthlyInput.getValue();
    const perairlineinput = PerMonthlyInput.getValue();




    const formattedStartDate = formatDate(monthlydate);

    const carrier = await fetchServiceType(perairlineinput); 

    const monthly = {
      data: {
        "Month": formattedStartDate,
        "Airline": perairlineinput,
        "Carrier": carrier,
        "Airport": airportinput
      }
    };

    console.log(monthly);

 setTimeout(() => {
      apiMonthlyAPI(monthly); 
      console.log("successfully fetched");
    }, 2000);

  } catch (error) {
    console.error("Error in Monthly function:", error);
  }
}






async function monthlyCreate() {
    const create_data = {
        Month: inSimpleForm1Month.getValue(),
        Year: inSimpleForm1Year.getValue(),
        Airport: inSimpleForm1Airport.getValue(),
        Airline: inSimpleForm1Airline.getValue(),
        NoOfFlightsDeparture: inSimpleForm1NoOfFlightsDeparture.getValue(),
        NoOfFlightArrival: inSimpleForm1NoOfFlightArrival.getValue(),
        TotalFlightsFlown: inSimpleForm1TotalFlightsFlown.getValue(),
        NoOfDelayedDeparture: inSimpleForm1NoOfDelayedDeparture.getValue(),
        NoOfDelayedArrival: inSimpleForm1NoOfDelayedArrival.getValue(),
        TotalFlightsDelayed: inSimpleForm1TotalFlightsDelayed.getValue(),
        NoOfCancelledDeparture: inSimpleForm1NoOfCancelledDeparture.getValue(),
        NoOfCancelledArrival: inSimpleForm1NoOfCancelledArrival.getValue(),
        TotalFlightsCancelled: inSimpleForm1TotalFlightsCancelled.getValue(),
        NoOfOTPDeparture: inSimpleForm1NoOfOTPDeparture.getValue(),
        NoOfOTPArrival: inSimpleForm1NoOfOTPArrival.getValue(),
        TotalFlightsOTP: inSimpleForm1TotalFlightsOTP.getValue(),
        DEP: inSimpleForm1DEP.getValue(),
        ARR: inSimpleForm1ARR.getValue(),
        TotalPercentage: inSimpleForm1TotalPercentage.getValue(),
        Remarks: inSimpleForm1Remarks.getValue(),
    };



  try {
    // Fetch existing data
    const checkUrl = `http://localhost:8080/api/entity/monthly_otp`;
    const checkResponse = await fetch(checkUrl, { method: "GET", headers: { "Content-Type": "application/json" } });

    if (!checkResponse.ok) {
        throw new Error(`Check request failed: ${checkResponse.statusText}`);
    }

    const existingData = await checkResponse.json();

    console.log(existingData)

    // Check for duplicates with different ID
    const duplicateExists = existingData.some(record =>
        record.Month  === create_data.Month && 
        record.Airport === create_data.Airport &&
        record.Airline === create_data.Airline
    );

    console.log(duplicateExists) 
    if (duplicateExists  === true) {
        sap.m.MessageToast.show("Error: Another airport with the same details already exists!");
        return;
    }

    // If no duplicate found, proceed with insertion
    await submitMonthlyData(create_data);

} catch (error) {
    console.error("Error checking existing data:", error.message);
    alert("An error occurred while checking existing data.");
}

}








// Function to submit data
async function submitMonthlyData(create_data) {
    try {
        const insertUrl = `http://localhost:8080/api/entity/monthly_otp`;

        const response = await fetch(insertUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(create_data), // Convert object to JSON string
        });

        if (!response.ok) {
            throw new Error(`Insert request failed: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log("Success:", responseData);
        sap.m.MessageToast.show("Airport data successfully added.");
        
    } catch (error) {
        console.error("Error inserting data:", error.message);
        alert("An error occurred while inserting the data.");
    }
}
