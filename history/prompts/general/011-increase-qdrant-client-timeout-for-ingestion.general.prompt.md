---
id: 011
title: Increase Qdrant client timeout for ingestion
stage: general
date: 2025-11-30
surface: agent
model: claude-sonnet-4-5-20250929
feature: rag-backend-api
branch: 001-rag-backend-api
user:
command:
labels: ["bugfix", "qdrant", "timeout"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - app/services/ingestion.py
tests_yaml:
  -
prompt_text: |
    Collection 'physical_ai_book' already exists.
    ERROR:    Traceback (most recent call last):
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpx\_transports\default.py", line 101, in map_httpcore_exceptions
        yield
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpx\_transports\default.py", line 250, in handle_request
        resp = self._pool.handle_request(req)
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpcore\_sync\connection_pool.py", line 256, in handle_request
        raise exc from None
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpcore\_sync\connection_pool.py", line 236, in handle_request
        response = connection.handle_request(
            pool_request.request
        )
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpcore\_sync\connection.py", line 103, in handle_request
        return self._connection.handle_request(request)
               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpcore\_sync\http11.py", line 136, in handle_request
        raise exc
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpcore\_sync\http11.py", line 88, in handle_request
        self._send_request_body(**kwargs)
        ~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpcore\_sync\http11.py", line 159, in _send_request_body
        self._send_event(event, timeout=timeout)
        ~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpcore\_sync\http11.py", line 166, in _send_event
        self._network_stream.write(bytes_to_send, timeout=timeout)
        ~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpcore\_backends\sync.py", line 135, in write
        with map_exceptions(exc_map):
             ~~~~~~~~~~~~~~^^^^^^^^^
      File "C:\Python313\Lib\contextlib.py", line 162, in __exit__
        self.gen.throw(value)
        ~~~~~~~~~~~~~~^^^^^^^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpcore\_exceptions.py", line 14, in map_exceptions
        raise to_exc(exc) from exc
    httpcore.WriteTimeout: The write operation timed out

    The above exception was the direct cause of the following exception:

    Traceback (most recent call last):
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\qdrant_client\http\api_client.py", line 134, in send_inner
        response = self._client.send(request)
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpx\_client.py", line 914, in send
        response = self._send_handling_auth(
            request,
        ...<2 lines>...
            history=[],
        )
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpx\_client.py", line 942, in _send_handling_auth
        response = self._send_handling_redirects(
            request,
            follow_redirects=follow_redirects,
            history=history,
        )
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpx\_client.py", line 979, in _send_handling_redirects
        response = self._send_single_request(request)
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpx\_client.py", line 1014, in _send_single_request
        response = transport.handle_request(request)
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpx\_transports\default.py", line 249, in handle_request
        with map_httpcore_exceptions():
             ~~~~~~~~~~~~~~~~~~~~~~~^^
      File "C:\Python313\Lib\contextlib.py", line 162, in __exit__
        self.gen.throw(value)
        ~~~~~~~~~~~~~~^^^^^^^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\httpx\_transports\default.py", line 118, in map_httpcore_exceptions
        raise mapped_exc(message) from exc
    httpx.WriteTimeout: The write operation timed out

    During handling of the above exception, another exception occurred:

    Traceback (most recent call last):
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\routing.py", line 694, in lifespan
        async with self.lifespan_context(app) as maybe_state:
                   ~~~~~~~~~~~~~~~~~~~~~^^^^^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\routing.py", line 571, in __aenter__
        await self._router.startup()
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\starlette\routing.py", line 671, in startup
        await handler()
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\app\main.py", line 41, in startup_event
        await ingest_book_content()
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\app\services\ingestion.py", line 176, in ingest_book_content
        await upsert_chunks_to_qdrant(all_chunks)
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\app\services\ingestion.py", line 145, in upsert_chunks_to_qdrant
        qdrant_client_instance.upsert(
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^
            collection_name=COLLECTION_NAME,
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        ...<5 lines>...
            **kwargs,
            ^^^^^^^^^
        )
        ^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\qdrant_client\qdrant_client.py", line 945, in upsert
        return self._client.upsert(
               ~~~~~~~~~~~~~~~~~~^
            collection_name=collection_name,
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        ...<5 lines>...
            **kwargs,
            ^^^^^^^^^
        )
        ^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\qdrant_client\qdrant_remote.py", line 1131, in upsert
        http_result = self.openapi_client.points_api.upsert_points(
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^
            collection_name=collection_name,
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        ...<2 lines>...
            ordering=ordering,
            ^^^^^^^^^^^^^^^^^^
        ).result
        ^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\qdrant_client\http\api\points_api.py", line 994, in upsert_points
        return self._build_for_upsert_points(
               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^
            collection_name=collection_name,
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        ...<2 lines>...
            point_insert_operations=point_insert_operations,
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        )
        ^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\qdrant_client\http\api\points_api.py", line 515, in _build_for_upsert_points
        return self.api_client.request(
               ~~~~~~~~~~~~~~~~~~~~~~~^
            type_=m.InlineResponse2005,
            ^^^^^^^^^^^^^^^^^^^^^^^^^^^
        ...<5 lines>...
            content=body,
            ^^^^^^^^^^^^^
        )
        ^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\qdrant_client\http\api_client.py", line 95, in request
        return self.send(request, type_)
               ~~~~~~~~~^^^^^^^^^^^^^^^^
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\qdrant_client\http\api_client.py", line 112, in send
        response = self.middleware(request, self.send_inner)
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\qdrant_client\http\api_client.py", line 250, in __call__
        return call_next(request)
      File "C:\Users\Umar Farooq\Desktop\unified-book-rag\.venv\Lib\site-packages\qdrant_client\http\api_client.py", line 136, in send_inner
        raise ResponseHandlingException(e)
    qdrant_client.http.exceptions.ResponseHandlingException: The write operation timed out
response_text: |
    Increased the Qdrant client timeout to 60 seconds in `app/services/ingestion.py` to resolve the `httpx.WriteTimeout` error during book content ingestion.
outcome: Qdrant client timeout increased.
evaluation: The `QdrantClient` initialization in `app/services/ingestion.py` was updated to include a `timeout=60` parameter, providing more time for the `upsert` operation to complete and addressing the `httpx.WriteTimeout` exception.
---