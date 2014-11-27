    // Variables globales


    var map, geocoder;
    //Crea la lista de marcadores
    var marcadores = []


    // Instancia del geocodificador
    

    geocoder = new google.maps.Geocoder();




    // Propiedades iniciales del mapa





    window.onload = function () {
        var options = {
            zoom: 12,
            center: new google.maps.LatLng(-33.467586, -70.636135),
            mapTypeId: google.maps.MapTypeId.ROADMAP


        };

        // Instancia del mapa

        map = new google.maps.Map(document.getElementById('map'), options);

        crearImagen()


        google.maps.event.addListener(map, 'zoom_changed', function () {
            var zoomLevel = map.getZoom();

            if (zoomLevel >= 12) {

                crearImagen()
            } else if (zoomLevel < 12) {

                borrarMarcadores()

            }

        });




        // Relación del evento de clic sobre el mapa con el
        // procedimiento de georreferenciación inversa

        google.maps.event.addListener(map, 'click', function (event) {
            processReverseGeocoding(event.latLng, showMarkerInfo);
        });
    }

    var tester

    function crearImagen() {


        var listaAnimal = Parse.Object.extend("animales");

        var query = new Parse.Query(listaAnimal);



        var imagen
        var posicion

        query.find({

            success: function (results) {
                for (var i = 0; i < results.length; i++) {

                    object = results[i];
                    imagen = object.get('imagen');
                    posicion = object.get('longitudLatitud');
                    console.log(posicion.latitude)
                    tester = posicion

                    //funcion que crea la marca, posicion, mapa, e icono

                    var myLatLng = new google.maps.LatLng(posicion.latitude, posicion.longitud);
                    var image = imagen;
                    var descripcion = descripcion;
                    var myLatLng = new google.maps.LatLng(posicion.latitude, posicion.longitude);
                    var beachMarker = new google.maps.Marker({
                        position: myLatLng,
                        map: map,
                        icon: image,

                    });

                    //Guarda este marcador dentro de la lista de marcadores 
                    marcadores.push(beachMarker)

                    //funcion para llamar a la marca
                    google.maps.event.addListener(beachMarker, 'click', function () {
                        infowindow.open(map, beachMarker);


                    });

                }
            },
            error: function () {

                console.log("error")

            }
        })




    }


    //Borra los marcadores del mapa ( se llama en el if else del zoom changed )
    function borrarMarcadores() {

        for (i = 0; i < marcadores.length; i++) {

            marcadores[i].setMap(null);

        }


    }


    /**
     * Obtener los posibles nombres de una ubicación geográfica a partir
     * de su localización (latitud, longitud).
     *
     * @param   location    Ubicación geográfica (latitud, longitud)
     * @param   callback    Función a ejecutarse después de una georrefereciación exitosa
     */

    function processReverseGeocoding(location, callback) {
        // Propiedades de la georreferenciación

        var request = {
            latLng: location
        }

        // Invocación a la georreferenciación (proceso)

        geocoder.geocode(request, function (results, status) {

            /*
             * OK
             * ZERO_RESULTS
             * OVER_QUERY_LIMIT
             * REQUEST_DENIED
             * INVALID_REQUEST
             */



            // En caso de terminarse exitosamente el proyecto ...

            if (status == google.maps.GeocoderStatus.OK) {
                // Invoca la función de callback

                callback(results);

                // Retorna los resultados obtenidos

                return results;
            }

            // En caso de error retorna el estado

            return status;
        });
    }

    /**
     * Mostrar en el mapa los topónimos encontrados para la ubicación
     * (latitud, longitud) especificada
     *
     * @param   locations    Listado de topónimos encontrados para
     *                                    una ubicación específica
     */

    function showMarkerInfo(locations) {
        // Centra el mapa en la ubicación especificada

        map.setCenter(locations[0].geometry.location);

        // Crea el mensaje para mostrar la información georreferenciada

        var infoWindow = new google.maps.InfoWindow();

        infoWindow.setPosition(locations[0].geometry.location);

        // Prepara el mensaje con la información obtenida del proceso
        // de georreferenciación inversa

        var content = 'Latitud:  ' + locations[0].geometry.location.lat() + '<br />' +
            'Longitud:  ' + locations[0].geometry.location.lng() + '<br />' +
            '<br />Topónimos:<br /><ul>';

        for (var i = 0; i < locations.length; i++) {
            if (locations[i].formatted_address)
                content += '<li>' + locations[i].formatted_address + '</li>';

            else
                content += '<li>No se encontró información.</li>';
        }

        content += "</ul>";

        infoWindow.setContent(content);

        // Muestra el mensaje sobre el mapa

        infoWindow.open(map);
    }
