<?php

function akassh_enqueue_assets() {
    wp_enqueue_style(
        'akassh-global-style',
        get_template_directory_uri() . '/build/style-index.css',
        [],
        filemtime( get_template_directory() . '/build/style-index.css' )
    );

    wp_enqueue_script(
        'akassh-blocks-js',
        get_template_directory_uri() . '/build/index.js',
        [ 'wp-blocks', 'wp-element', 'wp-editor' ],
        filemtime( get_template_directory() . '/build/index.js' ),
        true
    );
}
add_action('enqueue_block_assets', 'akassh_enqueue_assets');