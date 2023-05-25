from flask import Flask, request, Response

app = Flask(__name__)


@app.route('/')
def limited_response():
    data = "SFpVMTh7S25vd19tZV9icm9rZW5fYnlfbXlfbWFzdGVyX1RlYWNoX3RoZWVfb25fY2hpbGQsX2xvdmVfb2ZfaGVyZWFmdGVyX0ludG9fdGhlX2Zsb29kX2FnYWluX1NhbWVfb2xkX3RyaXBfaXRfd2FzX2JhY2tfdGhlbl9Tb19JX21hZGVfYV9iaWdfbWlzdGFrZV9UcnlfdG9fc2VlX2l0X29uY2VfbXlfd2F5X0ZlZWRfbXlfZXllc18oQ2FuX3lvdV9zZXdfdGhlbV9zaHV0PylfSmVzdXNfQ2hyaXN0XyhEZW55X3lvdXJfbWFrZXIpX0hlX3dob190cmllc18oV2lsbF9iZV93YXN0ZWQpX09oLF9mZWVkX215X2V5ZXNfKE5vd195b3UndmVfc2V3bl90aGVtKV9zaHV0X0ZlZWRfbXlfZXllc18oQ2FuX3lvdV9zZXdfdGhlbV9zaHV0PylfSmVzdXNfQ2hyaXN0XyhEZW55X3lvdXJfbWFrZXIpX0hlX3dob190cmllc18oV2lsbF9iZV93YXN0ZWQpX09oLF9mZWVkX215X2V5ZXNfKE5vd195b3UndmVfc2V3bl90aGVtKV9BSUN9"
    range_header = request.headers.get('Range')

    if range_header and range_header.startswith('bytes='):
        byte_range = range_header.split('=')[1]

        if '-' in byte_range:
            start_byte, end_byte = byte_range.split('-')

            if start_byte == '':
                # If start byte is not specified, assume it as 0
                start_byte = 0

            start_byte = int(start_byte)
            end_byte = int(end_byte) if end_byte else None
            print(start_byte)
            print(end_byte)
            # Concatenate records within the specified byte range
            response_content = '\n'.join(data[start_byte:end_byte])
            print(response_content)
            # Limit the response size to 800 bytes
            limited_content = response_content[:800].splitlines()

            # Create a Flask Response object with the limited content
            response = Response(limited_content, mimetype='text/plain')

            # Set the Content-Length header to the actual size of the limited content
            response.headers['Content-Length'] = str(len(limited_content))

            # Set the Content-Range header to indicate the byte range being returned
            content_range = f'bytes {start_byte}-{start_byte + len(limited_content) - 1}/{len(response_content)}'
            response.headers['Content-Range'] = content_range

            return response
    start_byte = 0
    # If no Range header is provided or it's invalid, return the entire content
    response_content = '\n'.join(data[start_byte:])

    # Limit the response size to 800 bytes
    limited_content = response_content[:800]

      # Limit the response size to 800 bytes
    limited_content = response_content[:800].splitlines()

    # Create a Flask Response object with the limited content
    response = Response(limited_content, mimetype='text/plain')

    # Set the Content-Length header to the actual size of the limited content
    response.headers['Content-Length'] = str(len(limited_content))

    return response
    

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5000')
