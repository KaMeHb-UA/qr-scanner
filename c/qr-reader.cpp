#include <emscripten.h>
#include "quirc/lib/quirc.h"
#include <new>
#include <iostream>


EMSCRIPTEN_KEEPALIVE
char** read(int** &image){
    struct quirc* qr = quirc_new(); // allocating memory
    if(!qr){
        throw std::bad_alloc();
        abort();
    }

    uint8_t* _image;
    int w, h;
    _image = quirc_begin(qr, &w, &h);

    int width = sizeof(image[0]);
    std::cout << "width detected: " << width;
    /* Fill out the image buffer here.
     * image is a pointer to a w*h bytes.
     * One byte per pixel, w pixels per line, h lines in the buffer.
     */

    quirc_end(qr);

    int num_codes, i;

    /* We've previously fed an image to the decoder via
     * quirc_begin/quirc_end.
     */

    num_codes = quirc_count(qr);

    char** res = new char *[num_codes];

    for(i = 0; i < num_codes; i++){
	    struct quirc_code code;
	    struct quirc_data data;
	    quirc_decode_error_t err;

	    quirc_extract(qr, i, &code);

	    /* Decoding stage */
	    err = quirc_decode(&code, &data);
        //printf("DECODE FAILED: %s\n", quirc_strerror(err));
        //printf("Data: %s\n", data.payload);
	    if (!err) res[i] = (char *) data.payload;
    }
    quirc_destroy(qr);
    return res;
}
