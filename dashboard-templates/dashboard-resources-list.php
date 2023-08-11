<?php 

if(isset($_GET['rtype'])) {
	$type = $_GET['rtype'];
} else {
	$type = '';
}


$args = array(
    'post_type' => 'post',
    'post_status' => 'publish',
    'posts_per_page' => 25,
    'lang' => 'fr',

);

$resources = new WP_Query($args);
?>

<?php if($resources->have_posts()): ?>
    <h2 class="py-3">All Resources</h2>
    <table class="table fs-sm">
        <thead class="bg-deepblue text-white">
            <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Category</th>
                <th>Date</th>
                <th></th>
            </tr>
        </thead>
        <?php while($resources->have_posts()): $resources->the_post(); ?>
        <?php
            $rtype = get_the_terms(get_the_ID(), 'resource_type');
            $cats = get_the_terms(get_the_ID(), 'category');
        ?>
            <tr>
                <td><?php the_title(); ?></td>
                <td><button class="btn btn-sm btn-primary pe-none"><?php echo implode(', ', wp_list_pluck($rtype, 'name')); ?></button></td>
                <td class="ff-inconsolata"><?php echo implode(',<br>', wp_list_pluck($cats, 'name')); ?></td>
                <td class="ff-inconsolata"><?php echo get_the_date('M j Y'); ?></td>
                <td><a class="btn btn-sm btn-secondary text-white" href=""><span class="dashicons dashicons-edit"></span></a> <a class="btn btn-sm btn-secondary text-white" href=""><span class="dashicons dashicons-wordpress"></span></a></td>
            </tr>
        <?php endwhile; ?>
    </table>
    <?php 
    understrap_pagination( [
            'total' => $resources->max_num_pages,
            'base' => '/dashboard/%_%',
            'prev_text' => '&#60;',
            'next_text' => '&#62;',
        ], 'pagination ff-inconsolata fw-bold' ); 
    ?>
<?php endif; ?>

