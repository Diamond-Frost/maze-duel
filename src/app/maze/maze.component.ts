import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-maze',
    templateUrl: './maze.component.html',
    styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit {

    constructor(private router: Router) {
        let route = router.url.split('/');
        if (route.length == 3) this.game_id = route[route.length - 1]
    }

    game_id: string = "no-id"

    ngOnInit(): void {
    }
}
