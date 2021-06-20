import React from "react";
import { Switch, Route } from "react-router-dom";
import "./AdminLayout.css";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AddBoat from "../AddBoat/AddBoat";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import BookingList from "../BookingList/BookingList";
import AddAdmin from "../AddAdmin/AddAdmin";
import ManageBoat from "../ManageBoat/ManageBoat";
import AddBooking from "../AddBooking/AddBooking";
import AddReview from "../AddReview/AddReview";
import MyBookings from "../MyBookings/MyBookings";
import { useAuth } from "../../../App";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser, setIsAdmin } = useAuth();

  useEffect(() => {
    fetch("https://salty-journey-40699.herokuapp.com/check-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: currentUser?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsAdmin(true);
          setLoading(false);
        }
      });
  }, []);

  return (
    <main>
      {loading ? (
        <div className="position-center text-center">
          <Spinner animation="border" role="status"></Spinner>
          <h5 className="theme-text mt-3">Checking Admin Permission...</h5>
        </div>
      ) : (
        <>
          <AdminSidebar />
          <section className="dashboard-content">
            <Switch>
              <Route exact path="/dashboard">
                <AdminDashboard />
              </Route>
              <Route path="/dashboard/add-boat">
                <AddBoat />
              </Route>
              <Route path="/dashboard/boats">
                <ManageBoat />
              </Route>
              <Route path="/dashboard/add-booking/:boat">
                <AddBooking />
              </Route>
              <Route path="/dashboard/add-booking">
                <AddBooking />
              </Route>
              <Route path="/dashboard/bookings">
                <MyBookings />
              </Route>
              <Route exact path="/dashboard/booking-list">
                <BookingList />
              </Route>
              <Route path="/dashboard/add-admin">
                <AddAdmin />
              </Route>
              <Route path="/dashboard/review">
                <AddReview />
              </Route>
            </Switch>
          </section>
        </>
      )}
    </main>
  );
};

export default AdminLayout;
