jQuery(function($){
    // Enable linking to Bootstrap tabs
    window.addEventListener('load', function() {
        // Check if the URL contains a hash
        if (window.location.hash) {
          var targetTab = window.location.hash;
          $(targetTab + 'Tab').click();
            // Scroll to targetTab
            $('html, body').animate({
                scrollTop: $(targetTab + 'Tab').offset().top - 200
            }, 200);
        }
    });
    
    // Home Values – Insert svg inside .home-values
    $('.home-values').prepend('<img class="position-absolute top-50 start-50 translate-middle w-100 mx-auto uk-animation-stroke" src="/wp-content/themes/opennorth/images/home-values.svg" uk-svg="stroke-animation: true">');

    // Links – insert svg inside .arrow-link
    $('.arrow-link a').append('<img class="ms-2" src="/wp-content/themes/opennorth/images/icon-arrow-link.svg">');

    // Scrollspy Elements
    $( window ).load(function() {
        $('.scroll-in').attr('uk-scrollspy', 'cls: uk-animation-slide-bottom-medium; delay: 200');
        $('.fade-in').attr('uk-scrollspy', 'cls: uk-animation-fade; delay: 200');
        $('.scroll-in-children').attr('uk-scrollspy', 'target: > div; cls: uk-animation-slide-bottom-small; delay: 200');
    });


    

    //////////////////////////
    //    Ajax Filtering    //
    //////////////////////////

    var filterTypes = ['rtype', 'subject', 'area'];
    
    // Loop through each filter type
    filterTypes.forEach((filterType) => {
        // When filterType is clicked
        $('#' + filterType + 'All').on('click', function() {
            if($('#' + filterType + 'All').prop('checked', true)) {
                // If already checked, prevent unchecking "all"
                $('#' + filterType + 'All').prop('checked', true);
            }
            // Uncheck all input with name filterType
            $('input[name="' + filterType + '"].subcheck').prop('checked', false);
        });
        // When any filterType subcheck is clicked
        $('input[name="' + filterType + '"].subcheck').on('click', function() {
            // Uncheck "All" input with name filterType
            if ($('input[name="' + filterType + '"].subcheck:not(:checked)').length === $('input[name="' + filterType + '"].subcheck').length) {
                $('#' + filterType + 'All').prop('checked', true);
            } else {
                $('#' + filterType + 'All').prop('checked', false);
            }

        });
    });

    // Filter Resources
    function filterResources() {
        var selectedResourceType = $('input[name="rtype"]:checked').map(function(){
            return $(this).val();
        }).get();
        var selectedResourceSubject = $('input[name="subject"]:checked').map(function(){
            return $(this).val();
        }).get();
        var sortOrder = $('#sortResources').val();
        var searchResourceTerm = $('#resourceSearch').val();

        $.ajax({
            url: '/wp-admin/admin-ajax.php', // WordPress provides the 'ajaxurl' global variable
            type: 'post',
            data: {
                action: 'filter_resources',
                rtype: selectedResourceType,
                subject: selectedResourceSubject,
                search: searchResourceTerm,
                sort: sortOrder
            },
            success: function(response) {
                $('#filteredResources').html(response);
            }
        });
    }

    function changeSortValue() {
        // If value of sortResources is "ASC", change to "DESC", and vice versa
        if($('#sortResources').val() === 'DESC') {
            $('#sortResources').val('ASC');
            // if html language is french
            if($('html').attr('lang') == 'en-CA') {
                $('#sortResources span').html('Oldest first');
            } else if($('html').attr('lang') == 'fr-CA'){
                $('#sortResources span').html('Les plus anciens en premier');
            }
        }
        else {
            $('#sortResources').val('DESC');
            if($('html').attr('lang') == 'en-CA') {
                $('#sortResources span').html('Newest first');
            } else if($('html').attr('lang') == 'fr-CA'){
                $('#sortResources span').html('Les plus récents en premier');
            }
        }
        $('#sortResources img').toggleClass('rotate-180');
        filterResources();
    }

    function filterCourses() {
        var selectedCourseType = $('input[name="area"]:checked').map(function(){
            return $(this).val();
        }).get();
        var searchCourseTerm = $('#courseSearch').val();


        $.ajax({
            url: '/wp-admin/admin-ajax.php', // WordPress provides the 'ajaxurl' global variable
            type: 'post',
            data: {
                action: 'filter_courses',
                area: selectedCourseType,
                search: searchCourseTerm,
            },
            success: function(response) {
                $('#filteredCourses').html(response);
            }
        });
    }

    // Filter Resources
    $('#filterResources input[type="checkbox"').on('change', filterResources);
    $('#filterResources #resourceSearch').on('keydown', function(event){if(event.keyCode == 13){filterResources()}});
    $('#filterResources #buttonSearch').on('click', filterResources);
    $('#filterResources #sortResources').on('click', changeSortValue);

    // Filter Courses
    $('#filterCourses input[type="checkbox"').on('change', filterCourses);
    $('#filterCourses #courseSearch').on('keydown', function(event){if(event.keyCode == 13){filterCourses()}});
    $('#filterCourses #buttonSearch').on('click', filterCourses);

});