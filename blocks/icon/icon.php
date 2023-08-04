<?php 
$name = get_field('icon_name');
$color = get_field('icon_color');
$heading = get_field('icon_heading');
$uniqid = uniqid();

$className = 'mb-3 block-svg-icon ' . 'block-svg-icon-' . $uniqid;
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}
if( !empty($block['align']) ) {
    $className .= ' align' . $block['align'];
}
?>

<?php if($color): ?>
<style>
    .block-svg-icon-<?= $uniqid; ?> svg,
    .block-svg-icon-<?= $uniqid; ?> svg path {
        stroke: <?php echo $color; ?> !important;
    }
    .icon-heading {
        color: <?php echo $color; ?>;
    }
</style>
<?php endif; ?>

<div class="<?php echo esc_attr($className); ?>">
     <div class="row justify-content-center align-items-center" uk-scrollspy="target: svg; cls: uk-animation-stroke; delay: 200">
        <div class="col<?php if($heading) { echo '-4 col-md-3 col-lg-4 mb-3 mb-lg-0'; } ?> text-center"><img class="w-100" src="<?php echo get_stylesheet_directory_uri(); ?>/images/<?= $name; ?>.svg" hidden uk-svg="stroke-animation:true"></div>
        <?php if($heading): ?>
            <div class="col-4 col-lg-4 text-center">
                <p class="mb-0 <?php if(lang_en()) {echo 'h3'; } elseif(lang_fr()) { echo 'h4'; } ?> icon-heading"><?= $heading; ?></p> 
            </div>
        <?php endif; ?>
    </div>
</div>