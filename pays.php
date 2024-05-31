<?php
/**
 * Package Pays
 * Version 1.0.0
 */
/*
Plugin name: Pays
Plugin uri: https://github.com/Metal-X-64
Version: 1.0.0
Description: Permet d'afficher les destinations par pays
*/
function samuelgiroux_enqueue()
{
// filemtime // retourne en milliseconde le temps de la dernière modification
// plugin_dir_path // retourne le chemin du répertoire du plugin
// __FILE__ // le fichier en train de s'exécuter
// wp_enqueue_style() // Intègre le link:css dans la page
// wp_enqueue_script() // intègre le script dans la page
// wp_enqueue_scripts // le hook

$version_css = filemtime(plugin_dir_path( __FILE__ ) . "style.css");
$version_js = filemtime(plugin_dir_path(__FILE__) . "js/pays.js");
wp_enqueue_style(   'em_plugin_pays_css',
                     plugin_dir_url(__FILE__) . "style.css",
                     array(),
                     $version_css);

wp_enqueue_script(  'em_plugin_pays_js',
                    plugin_dir_url(__FILE__) ."js/pays.js",
                    array(),
                    $version_js,
                    true);
}
add_action('wp_enqueue_scripts', 'samuelgiroux_enqueue');
/* Création de la liste des pays en HTML */
function creer_bouton_pays(){
    $pays = get_categories();
    $contenu = '';
        foreach($pays as $elm_pays) {
        $nom = $elm_pays->name;
        $id = $elm_pays->term_id;
        $contenu .= '<button id="cat_'.$id.'" class="lien__categorie">'.$nom.'</button>';
        }
        return $contenu;
}


function creation_pays(){
    $contenu = creer_bouton_pays() . '<div class="contenu__restapi"></div>';
    return $contenu;
}


add_shortcode('em_pays', 'creation_pays');
?>