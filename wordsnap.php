<?php
/**
 * @package WordSnap
 */
/*
Plugin Name: WordSnap
Plugin URI: http://codeify.net/wordsnap/
Description: Quickly and easily export/import any post in your WordPress blog with <strong>WordSnap</strong>. Just one click and you're done!
Version: 0.0.1
Author: Codeify
Author URI: http://codeify.net/
License: GPLv2 or later
*/

/*
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

function_exists('add_action') || die();

add_action('admin_enqueue_scripts', function($hook) {
	if($hook !== 'post.php' && $hook !== 'post-new.php') return;
	wp_enqueue_script('wordsnap', plugin_dir_url(__FILE__) . '/wordsnap.js');
	wp_enqueue_style('wordsnap', plugin_dir_url(__FILE__) . '/wordsnap.css');
});
