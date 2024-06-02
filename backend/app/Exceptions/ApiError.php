<?php
    namespace App\Exceptions;

    use Exception;
    
    class ApiError extends Exception
    {
        protected $statusCode;
        protected $message;
        public function __construct($statusCode, $message)
        {
            $this->statusCode = $statusCode;
            $this->message = $message;
            parent::__construct($message);
        }
        
        public function getStatusCode()
        {
            return $this->statusCode;
        }
    
        public function render($request)
        {
            return response()->json([
                'code' => $this->getStatusCode(),
                'error' => $this->message,
            ], $this->statusCode);
        }
        // You can add custom properties or methods here
    }


?>