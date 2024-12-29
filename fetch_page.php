<?php
// Check if the 'url' parameter is provided
if (isset($_GET['url']) && filter_var($_GET['url'], FILTER_VALIDATE_URL)) {
    $url = $_GET['url'];

    // Use cURL to fetch the content of the URL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0');
    $htmlContent = curl_exec($ch);
    curl_close($ch);

    // Check if content is fetched successfully
    if ($htmlContent) {
        // Create a DOMDocument instance to parse the HTML content
        $dom = new DOMDocument();
        @$dom->loadHTML($htmlContent);

        // Get the title and body content
        $title = $dom->getElementsByTagName('title')->item(0)->nodeValue;
        $bodyContent = '';

        // Extract the body content (You can modify this part to extract specific elements)
        $body = $dom->getElementsByTagName('body')->item(0);
        if ($body) {
            $bodyContent = $dom->saveHTML($body);
        }

        // Return the content as JSON for the client to use
        echo json_encode([
            'title' => $title,
            'body' => $bodyContent
        ]);
    } else {
        echo json_encode([
            'error' => 'Unable to fetch the content of the URL.'
        ]);
    }
} else {
    echo json_encode([
        'error' => 'Invalid URL parameter.'
    ]);
}
?>