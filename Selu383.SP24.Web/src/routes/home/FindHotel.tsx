import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { HotelDto } from "../../features/hotels/HotelDto";

export default function FindHotel() {
  const [params] = useSearchParams();
  const searchTerm = params.get("searchTerm");

  const [hotels, setHotels] = useState<HotelDto[]>([]);

  useEffect(() => {
    fetch("/api/hotels/find", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchTerm: searchTerm,
      }),
    })
      .then<HotelDto[]>((r) => r.json())
      .then((j) => {
        setHotels(j);
      });
  }, [searchTerm]);
  console.log(searchTerm);

  return (
    <div>
      <p>{searchTerm}</p>
      <div>Found these hotels</div>
      <ul>
        {hotels?.map((hotel) => (
          <li key={hotel.id}>
            <Link to={`/hotel-details/${hotel.id}`}>{hotel.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
