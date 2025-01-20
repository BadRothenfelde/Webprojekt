# Web-Projekt: Restaurant

The "Moderne Restaurant mit automatisiertem Bestellungsverfahren" project aims to revolutionize the dining experience by creating a streamlined, digitalized ordering process. This project combines cutting-edge web technologies and a robust backend to enhance both the customer and staff experience in a restaurant setting. Through this automated system, customers will be able to seamlessly make reservations, view real-time table availability, and order from a digital menu, reducing wait times and improving order accuracy.

## Overview

The system will utilize a QR code generator to provide each table with a unique digital identity, enabling guests to access the menu and place orders directly from their mobile devices. The process covers essential functionalities, from table occupancy and reservation tracking to order processing and payment.

## Technology Stack / Requirement

* [Django](https://www.djangoproject.com/)
* [Angular](https://angular.dev/)
* [MariaDB](https://mariadb.org/)
* [Python](https://www.python.org)

**[1]** Angular configuration: Stylesheet from: CSS; enabled SSR and SSG (Prerendering)

## Install and Run

### First time

1. Navigate to the **frontend** directory
2. Run `npm install`
3. If on Linux/macOS Run `python -m pip install Django`
4. If on Windows Run `py -m pip install Django`

### Serve Angular application on local machine

1. Run `ng serve` within the **frontend** directory
2. Navigate to the browser `http://localhost:4200`

### Serve Django application on local machine

1. Run `python manage.py runserver` within the **backend** directory
2. Navigate to the browser `http://localhost:8000`

## Running Docker

1. Run `docker compose up --build` within the **top** directory
2. Navigate to the browser `http://localhost:4200`

## Feature Overview

1. **QR Code Generation** (Optional): Unique table access for digital ordering
2. **Table and Local Occupancy**: Real-time display of available tables and current restaurant capacity.
3. **Reservation System**: Streamlined online reservation process.
4. **Digital Ordering Process**:
   * **Menu Selection**: View and choose from a curated digital menu
   * **Cart Management**: Add items to a virtual cart before finalizing the order
   * **Payment Gateway**: Secure, streamlined payment process
   * **Order Submission**: Quick and reliable order placement
5. **Order Management**: Smooth backend process for staff to view and manage orders.
6. **Admin Console**:
   * **Content Management**: Update menu, availability, and promotions
   * **Newsletter Management**: Keep customers informed of new offerings.
